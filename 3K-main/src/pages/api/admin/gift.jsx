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
                    console.log(req.body)

                    // ดึงข้อมูล id จากตาราง game_acc_id โดยระบุเงื่อนไข account เป็น 'cptumz1'
                    const idQuery = `SELECT id FROM game_acc_id WHERE account = '${req.body.PL}'`;
                    const idResult = await pool.request().query(idQuery);
                    const accid = idResult.recordset[0].id;

                    // สร้างคำสั่ง SQL INSERT เพื่อเพิ่มข้อมูลในตาราง buyitem โดยใช้ค่าที่ได้จากตาราง game_acc_id
                    const insertQuery = `
    INSERT INTO buyitem (account_id, disable, create_time, sender_name, sender_acc_id, sender_sname, cost_point, sname, charname, dataid, number, data1, data2)
    VALUES (@accid, 0, GETDATE(), 'Event', @accid, '???????????', 0, '', '', ${req.body.IT}, ${req.body.AM}, 0, 0)
`;

                    // ส่งคำสั่ง SQL INSERT ไปที่ฐานข้อมูล
                    await pool.request()
                        .input('accid', accid)
                        .query(insertQuery);
                    res.status(200).json({ msg: 'ให้ของผู้เล่นสำเร็จ' })
                    // res.status(200).json(result.recordset[0])
                }
            });
        }
    } catch (e) {
        // console.log(e)
        res.status(500).json({ msg: e })
    }
}