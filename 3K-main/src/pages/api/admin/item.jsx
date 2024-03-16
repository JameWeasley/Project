import jwt from "jsonwebtoken";
import { poolPromise } from '@/ess/mssql'
import date_time from '/ess/datetime'
const datetime = new date_time()

import dbConnect from '/mongodb/mongo'
import db_items from '/mongodb/db_items'
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
                            if (isEmpty(req.body.FN)) return res.status(500).json({ msg: 'กรุณากรอกข้อมูลให้ครับถ้วน' })

                            const lines = req.body.FN.split('\n');

                            // สร้าง object เพื่อเก็บข้อมูล
                            const data = {};

                            // วนลูปผ่านทุกบรรทัด
                            lines.forEach(line => {
                                // แยก key และ value โดยใช้เครื่องหมาย "="
                                const [key, value] = line.split('=').map(item => item.trim());
                                // เก็บข้อมูลใน object
                                if (key && value) {
                                    // ตรวจสอบว่า key นั้นมีอยู่แล้วหรือไม่
                                    if (data.hasOwnProperty(key)) {
                                        // ถ้ามีอยู่แล้วให้เป็น array เพื่อเก็บค่าทั้งหมด
                                        if (!Array.isArray(data[key])) {
                                            data[key] = [data[key]];
                                        }
                                        data[key].push(value);
                                    } else {
                                        data[key] = value;
                                    }
                                }
                            });
                            await db_items.collection.insertOne({ ...data, image: req.body.FI })
                            res.status(200).json({ msg: 'เพิ่มไอเท็มสำเร็จ' })
                            break
                        case 'DELETE':
                            if (isEmpty(req.query.id)) return res.status(500).json({ msg: 'ไม่พบไอเท็ม' })
                            await db_items.deleteOne({ _id: req.query.id })
                            res.status(200).json({ msg: 'ลบไอเท็มสำเร็จ' })
                            break
                        case 'PUT':
                            if (isEmpty(req.body.id)) return res.status(500).json({ msg: 'ไม่พบไอเท็ม' })
                            await db_items.findOneAndUpdate({ _id: req.body.id }, { name: req.body.FN, image: req.body.FI });
                            res.status(200).json({ msg: 'แก้ไขไอเท็มสำเร็จ' })
                            break
                    }
                    // res.status(200).json(result.recordset[0])
                }
            });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}