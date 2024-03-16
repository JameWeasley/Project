import { poolPromise } from '@/ess/mssql'
import date_time from '@/ess/datetime'
const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async function formHandler(req, res) {
    return checkTurnstileToken(req, res);
}

async function checkTurnstileToken(req, res) {
    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    const token = req.body.token;

    const formData = new FormData();
    formData.append('secret', process.env.NEXT_PUBLIC_CF_SKey);
    formData.append('response', token);

    try {
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
        });

        const outcome = await result.json();
        if (outcome.success) {
            return processForm(req, res);
        }
    } catch (err) {
        console.error(err);
    }
    res.status(500).json({ msg: "กรุณายืนยัน CAPTCHA" });
    return;
}

async function processForm(req, res) {
    try {
        const pool = await poolPromise;

        if (
            !isEmpty(req.body.username) &&
            !isEmpty(req.body.password)
        ) {
            const {
                username,
                password,
            } = req.body
            const now = await datetime.now()
            if (password.length < 8) return res.status(500).json({ msg: "รหัสผ่านต้องมีความยาวมากกว่า 8ตัว" })

            const result = await pool.request()
                .input('account', username)
                .query('SELECT account FROM game_acc WHERE account = @account');

            if (result.recordset[0]) {
                res.status(500).json({ msg: 'มีบัญชีนี้อยู่แล้ว' })
            } else {
                const result = await pool.request()
                    .input('account', username)
                    .input('password', password)
                    .input('time', now)
                    .query(`insert into game_acc (account,password,privilege,create_time) values (@account,@password,1,@time)`);
                res.status(200).json({ msg: 'สมัครสมาชิกสำเร็จ' })
            }
        } else {
            res.status(500).json({ msg: "กรุณากรอกข้อมูลให้ครบถ้วน" })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}
