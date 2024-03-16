import jwt from "jsonwebtoken";
import { poolPromise } from '@/ess/mssql'
import date_time from '/ess/datetime'
const datetime = new date_time()

import dbConnect from '/mongodb/mongo'
import db_shop from '/mongodb/db_shop'
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
                            if (isEmpty(req.body.FN) && isEmpty(req.body.IT)) return res.status(500).json({ msg: 'กรุณากรอกข้อมูลให้ครับถ้วน' })
                            db_shop.collection.insertOne({
                                ShopName: req.body.FN,
                                image: req.body.FI,
                                items: req.body.IT,
                            })
                            res.status(200).json({ msg: 'เพิ่มร้านค้าสำเร็จ' })
                            break
                        case 'DELETE':
                            if (isEmpty(req.query.id)) return res.status(500).json({ msg: 'ไม่พบร้านค้า' })
                            await db_shop.deleteOne({ _id: req.query.id })
                            res.status(200).json({ msg: 'ลบร้านค้าสำเร็จ' })
                            break
                        case 'PUT':
                            if (isEmpty(req.body.id)) return res.status(500).json({ msg: 'ไม่พบร้านค้า' })
                            await db_shop.findOneAndUpdate({ _id: req.body.id }, { ShopName: req.body.FN, items: req.body.IT, image: req.body.FI });
                            res.status(200).json({ msg: 'แก้ไขร้านค้าสำเร็จ' })
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