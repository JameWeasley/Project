import jwt from "jsonwebtoken";
import dbConnect from '/mongodb/mongo'
import db_boss from '/mongodb/db_boss'
import date_time from '/ess/datetime'

// import items from '@/Json/Players.json'
// import items_name from '@/Json/Players_NAME.json'
// import DropItem from '@/Json/DropItem.json'
// import items_code from '@/Json/Players_H.json'
// import item_h from '@/Json/ITEM_H.json'

const datetime = new date_time()

function isEmpty(str) {
    return !str || str.length === 0
}

export default async (req, res) => {
    try {

        // var item = items
        // const data = await Promise.all(item.map(async (d, i) => {
        //     var code = items_code.find(({ code }) => code === d.code)
        //     var name = items_name.find(({ item }) => item === d.name)
        //     // var desc = items_desc.find(({ id }) => id === d.help_string)
        //     // d['code_de'] = d.code
        //     d['code'] = code?.id || d.code
        //     d['name'] = name?.name || d.name
        //     // d['help_string'] = desc?.desc || d.help_string
        //     var dp = await DropItem.find(({ drop }) => drop === d.code)
        //     // d['drop'] = dp.items && typeof dp.items === 'array' ? dp.items : []
        //     let dataArray = d.type2 && typeof d.type2 === 'string' ? d.type2.split(',') : [];
        //     let dataArray3 = d.type3 && typeof d.type3 === 'string' ? d.type3.split(',') : [];
        //     let dataArray2 = d.limit_job && typeof d.limit_job === 'string' ? d.limit_job.split(',') : [];
        //     let dataArray4 = dp && dp.items && typeof dp.items === 'string' ? dp.items.split(',') : [];
        //     // console.log(!dp?.items ? dp : '')


        //     // let resultArray = dataArray && dataArray.map(item => item.trim());
        //     d['type'] = dataArray || {}
        //     d['limit_job'] = dataArray2 || {}
        //     d['drop'] = []
        //     dataArray3 && d.type.push(dataArray3)
        //     dataArray4 && await Promise.all(dataArray4.map(async (dd, ii) => {
        //         var code = item_h.find(({ id }) => id === dd)
        //         code ? d.drop.push(code.code) : d.drop.push(dd)
        //     }))

        //     dataArray3 && await Promise.all(dataArray3.map(async (dd, ii) => {
        //         dd && d.type.push(dd)
        //     }))
        //     return d
        // }))



        await dbConnect();
        const itemsPerPage = Number(req.query.show_per_page) || 20;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const totalItems = await db_boss.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const result = await db_boss.find().skip(page * itemsPerPage).limit(itemsPerPage)

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