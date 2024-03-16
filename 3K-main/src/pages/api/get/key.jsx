import items from '@/Json/final_boss.json'
import items_name from '@/Json/ITEM2_NAME.json'
import items_desc from '@/Json/Item2_Help_String.json'
import items_code from '@/Json/ITEM2_H.json'
import jwt from "jsonwebtoken";
import dbConnect from '/mongodb/mongo'
import db_items from '/mongodb/db_items'
import date_time from '/ess/datetime'
const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {

        // สร้างเซตเพื่อเก็บ key ทั้งหมดที่เจอ
        const keySet = new Set();

        // วนลูปผ่านทุกๆ object ใน JSON
        items.forEach(obj => {
            // วนลูปผ่าน key ในแต่ละ object
            Object.keys(obj).forEach(key => {
                // เพิ่ม key เข้าเซตหากยังไม่มีอยู่
                if (!keySet.has(key)) {
                    keySet.add(key);
                }
            });
        });

        // แปลง set เป็น array และพิมพ์ออกมา
        const allKeys = Array.from(keySet);
        console.log(allKeys);
        res.status(200).json(allKeys)

    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}