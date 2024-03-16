import jwt from "jsonwebtoken";
import { poolPromise } from '@/ess/mssql'
import date_time from '/ess/datetime'
const datetime = new date_time()
import axios from "axios";

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {
        const pool = await poolPromise;
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
                    if (!req.body.payload) return res.status(500).json({ msg: 'กรุณาอัพโหลดสลิปใหม่' })
                    await axios.post(
                        'https://suba.rdcw.co.th/v1/inquiry',
                        {
                            'payload': req.body.payload
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            auth: {
                                username: 'b4450d65332e44a1b6dbb91ed708acfa',
                                password: 'YSRv-buCf6sPwMrRM-pl6'
                            }
                        })
                        .then(async (rp) => {
                            console.log(rp.data.data.receiver)
                            if (rp.data.isCached) return res.status(500).json({ msg: 'สลิปนี้ถูกใช้แล้ว' })
                            if (rp.data.data.receiver.displayName.split(' ')[1] !== 'อ้วน' && rp.data.data.receiver.proxy.value !== '5-1303-0002x-xx-x') return res.status(500).json({ msg: 'สลิปนี้ไม่ถูกต้อง' })
                            if (rp.data.data.countryCode !== 'TH') return res.status(500).json({ msg: 'สกุลเงินไม่ถูกต้อง กรุณาติดต่อแอดมิน' })
                            await pool.request()
                                .input('account', data.user)
                                .input('point', rp.data.data.amount * Number(process.env.NEXT_PUBLIC_Topup))
                                .query('UPDATE game_acc SET point = point + @point WHERE account = @account');
                            res.status(200).json({ msg: `เติมเงินสำเร็จ ได้รับ ${rp.data.data.amount * Number(process.env.NEXT_PUBLIC_Topup)} Point` })
                        })
                        .catch(async (e) => {
                            console.log(e)
                            res.status(500).json(e.response?.data)
                        })
                }
            });
        }
    } catch (e) {
        // console.log(e)
        res.status(500).json({ msg: e })
    }
}