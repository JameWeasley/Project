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
        if (req.query?.item == '[""]') return res.status(200).json({ item: [] })
        const data = await Promise.all(JSON.parse(req.query?.item).map(async (d, i) => {
            const result = await db_items.findOne({ code: d });
            return { name: result?.name || '', icon: result?.icon || '' }
        }))
        const filteredData = data.filter(item => item !== null && item !== undefined);

        res.status(200).json(filteredData);
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}