import items from '@/Json/ITEM2.json'
import items_name from '@/Json/ITEM2_NAME.json'
import items_desc from '@/Json/Item2_Help_String.json'
import items_code from '@/Json/ITEM2_H.json'
import jwt from "jsonwebtoken";
import dbConnect from '/mongodb/mongo'
import db_items from '/mongodb/db_items'
import date_time from '/ess/datetime'
const datetime = new date_time()

export default async function test(req, res) {
    try {
        // await dbConnect();
        // const itemsPerPage = Number(req.query.show_per_page) || 20;
        // const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        // const totalItems = await db_items.countDocuments();
        // const totalPages = Math.ceil(totalItems / itemsPerPage);

        // const result = await db_items.find().skip(page * itemsPerPage).limit(itemsPerPage)

        res.status(200).json({
            test: "x"
            // current_page: page + 1,
            // total: totalPages,
            // data: result
        });

        // res.status(200).json(data)

    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
  
}
