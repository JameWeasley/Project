import items from '@/Json/ITEM2.json'
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
        // var item = items
        // const data = await Promise.all(item.map(async (d, i) => {
        //     var code = items_code.find(({ id }) => id === d.code)
        //     var name = items_name.find(({ id }) => id === d.name)
        //     var desc = items_desc.find(({ id }) => id === d.help_string)
        //     // d['code_de'] = d.code
        //     d['code'] = code?.code || d.code
        //     d['name'] = name?.name || d.name
        //     d['help_string'] = desc?.desc || d.help_string
        //     let dataArray = d.type2 && typeof d.type2 === 'string' ? d.type2.split(',') : [];
        //     let dataArray3 = d.type3 && typeof d.type3 === 'string' ? d.type3.split(',') : [];
        //     let dataArray2 = d.limit_job && typeof d.limit_job === 'string' ? d.limit_job.split(',') : [];


        //     // let resultArray = dataArray && dataArray.map(item => item.trim());
        //     d['type'] = dataArray || {}
        //     d['limit_job'] = dataArray2 || {}
        //     // dataArray3 && d.type.push(dataArray3)


        //     dataArray3 && await Promise.all(dataArray3.map(async (dd, ii) => {
        //         dd && d.type.push(dd)
        //     }))
        //     return d
        // }))

        await dbConnect();
        const itemsPerPage = Number(req.query.show_per_page) || 20;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const totalItems = await db_items.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const result = await db_items.find().skip(page * itemsPerPage).limit(itemsPerPage)

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