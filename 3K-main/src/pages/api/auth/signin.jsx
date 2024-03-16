import jwt from "jsonwebtoken";
import { poolPromise } from '@/ess/mssql'
import date_time from '/ess/datetime'
const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {
        const pool = await poolPromise;

        if (!isEmpty(req.body.username) && !isEmpty(req.body.password)) {
            const { username, password } = req.body
            const now = await datetime.now()
            const result = await pool.request()
                .input('account', username)
                .query('SELECT account,password FROM game_acc WHERE account = @account');
            if (!result.recordset[0]) return res.status(500).json({ msg: "ไม่พบบัญชี" })
            if (result.recordset[0].password !== password) return res.status(500).json({ msg: "รหัสผ่านไม่ถูกต้อง" })
            var jwt_token = await jwt.sign({ user: result.recordset[0].account, dev: 'NoNamePlay' }, process.env.JWT_SECRET, { expiresIn: '1d' })
            await pool.request()
                .input('account', result.recordset[0].account)
                .input('jwt', String(jwt_token))
                .query('UPDATE game_acc SET jwt = @jwt WHERE account = @account')
            await res.status(200).json({ token: jwt_token, msg: 'เข้าสู่ระบบสำเร็จ' })
        } else {
            res.status(500).json({ msg: 'กรุณากรอกข้อมูลให้ครบถ้วน' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}