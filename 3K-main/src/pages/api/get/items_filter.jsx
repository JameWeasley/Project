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
        await dbConnect()
        const regex = new RegExp(req.query.IFT, 'i');
        const regex2 = new RegExp(req.query.FT, 'i');

        await dbConnect();
        const itemsPerPage = Number(req.query.show_per_page) || 20;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const totalItems = await db_items.countDocuments({ name: { $regex: regex }, type: { $regex: regex2 } });
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const result = await db_items.find({ name: { $regex: regex }, type: { $regex: regex2 } }).skip(page * itemsPerPage).limit(itemsPerPage)

        res.status(200).json({
            current_page: page + 1,
            total: totalPages,
            data: result
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}