import boss from '@/Json/final_boss.json'
import map from '@/Json/Army.json'
// import items_desc from '@/Json/Shop_Help_String.json'
import items_code from '@/Json/Shop_H.json'

import item_h from '@/Json/Players_H.json'
import stage_h from '@/Json/Stage.json'
import jwt from "jsonwebtoken";
import dbConnect from '/mongodb/mongo'
import db_shop from '/mongodb/db_shop'
import date_time from '/ess/datetime'
const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {
        function mergeData(boss, map) {
            // วนลูปผ่าน boss
            for (let i = 0; i < boss.length; i++) {
                const bossCode = boss[i].code;
                // ค้นหา map ที่มี code ตรงกับ boss.code
                const matchedMap = map.find(item => item.code === bossCode);
                // หากมี map ที่ตรงกัน
                if (matchedMap) {
                    // นำข้อมูล maps จาก map และ push เข้า boss
                    boss[i].maps = matchedMap.maps;
                }
            }
        }

        // เรียกใช้ฟังก์ชันเพื่อรวมข้อมูล
        await mergeData(boss, map);


        const itemsPerPage = Number(req.query.show_per_page) || 20;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const dividedArrays = [];
        for (let i = 0; i < boss.length; i += itemsPerPage) {
            const pageArray = boss.slice(i, i + itemsPerPage);
            dividedArrays.push(pageArray);
        }
        // res.status(200).json({
        //     current_page: page,
        //     total: Math.ceil(boss.length / itemsPerPage) || [],
        //     boss: dividedArrays[page]
        // });
        res.status(200).json(boss)

    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}