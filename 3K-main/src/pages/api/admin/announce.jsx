import jwt from "jsonwebtoken";
import { poolPromise } from '@/ess/mssql'
import date_time from '/ess/datetime'
const datetime = new date_time()

import dbConnect from '/mongodb/mongo'
import db_announce from '/mongodb/db_announce'
function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {
        const pool = await poolPromise;
        await dbConnect()
        var token = req.headers.authorization;
        if (!isEmpty(token)) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
                if (err) {
                    res.status(500).json({ msg: 'เซสชั่นหมดอายุแล้ว' })
                } else {
                    const result = await pool.request()
                        .input('account', data.user)
                        .query('SELECT account,point,jwt,privilege FROM game_acc WHERE account = @account');
                    if (result.recordset[0].jwt !== token) return res.status(500).json({ msg: 'มีการเข้าสู่ระบบจากที่อื่น' })
                    if (result.recordset[0].privilege !== 3) return res.status(500).json({ msg: 'no permission' })
                    switch (req.method) {
                        case 'POST':
                            if (isEmpty(req.body.T) && isEmpty(req.body.DD)) return res.status(500).json({ msg: 'กรุณากรอกข้อมูลให้ครับถ้วน' })
                            const order = await db_announce.countDocuments();
                            db_announce.collection.insertOne({
                                title: req.body.T,
                                desc: req.body.DD,
                                order: order + 1,
                            })
                            res.status(200).json({ msg: 'เพิ่มประกาศสำเร็จ' })
                            break
                        case 'DELETE':
                            if (isEmpty(req.query.id)) return res.status(500).json({ msg: 'ไม่พบประกาศ' })
                            await db_announce.deleteOne({ _id: req.query.id })
                            res.status(200).json({ msg: 'ลบประกาศสำเร็จ' })
                            break
                        case 'PUT':
                            if (isEmpty(req.body.ID)) return res.status(500).json({ msg: 'ไม่พบประกาศ' })
                            await db_announce.findOneAndUpdate({ _id: req.body.ID }, {
                                title: req.body.T,
                                desc: req.body.DD,
                            });
                            res.status(200).json({ msg: 'แก้ไขประกาศสำเร็จ' })
                            break
                    }
                    // res.status(200).json(result.recordset[0])
                }
            });
        }
    } catch (e) {
        // console.log(e)
        res.status(500).json({ msg: e })
    }
}