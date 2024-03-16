// import items from '@/Json/Shopdata4.json'
// import items_name from '@/Json/Shop_name.json'
// // import items_desc from '@/Json/Shop_Help_String.json'
// import items_code from '@/Json/Shop_H.json'

import item_h from '@/Json/ITEM_H.json'
import jwt from "jsonwebtoken";
import dbConnect from '/mongodb/mongo'
import db_announce from '/mongodb/db_announce'
import date_time from '/ess/datetime'
const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {
        await dbConnect();
        const itemsPerPage = Number(req.query.show_per_page) || 10;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const totalItems = await db_announce.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const result = await db_announce.find().skip(page * itemsPerPage).limit(itemsPerPage).sort({ order: -1 });

        res.status(200).json({
            current_page: page + 1,
            total: totalPages,
            data: result
        });
        // res.status(200).json(data)

    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}