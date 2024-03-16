import jwt from "jsonwebtoken";
import dbConnect from '/mongodb/mongo'
import db_items from '/mongodb/db_items'
import db_boss from '/mongodb/db_boss'
import date_time from '/ess/datetime'
const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {
        await dbConnect()
        const regex = new RegExp(req.query.item, 'i');
        const result = await db_boss.find({ drop: { $in: req.query.item } });
        res.status(200).json(result);
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}