// import items from '@/Json/Shopdata4.json'
// import items_name from '@/Json/Shop_name.json'
// // import items_desc from '@/Json/Shop_Help_String.json'
// import items_code from '@/Json/Shop_H.json'

import item_h from '@/Json/ITEM_H.json'
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
        // var item = items
        // const data = await Promise.all(item.map(async (d, i) => {
        //     var code = await items_code.find(({ id }) => id === d.code)
        //     var name = await items_name.find(({ id }) => id === d.ShopName)
        //     d['code'] = code?.code || d.code
        //     d['ShopName'] = name?.name || d.ShopName
        //     d['items'] = []

        //     let dataArray4 = d.Item && typeof d.Item === 'string' ? d.Item.split(',') : [];
        //     dataArray4 && await Promise.all(dataArray4.map(async (dd, ii) => {
        //         var code = await item_h.find(({ id }) => id === dd.replace("Item", "item"))
        //         code ? d.items.push(code.code) : d.items.push(dd + 'asd')
        //     }))
        //     return d
        // }))

        // await dbConnect()
        // const result = await db_shop.find();

        // const itemsPerPage = Number(req.query.show_per_page) || 20;
        // const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        // const dividedArrays = [];
        // for (let i = 0; i < result.length; i += itemsPerPage) {
        //     const pageArray = result.slice(i, i + itemsPerPage);
        //     dividedArrays.push(pageArray);
        // }
        // res.status(200).json({
        //     current_page: page,
        //     total: Math.ceil(result.length / itemsPerPage) || [],
        //     data: dividedArrays[page]
        // });
        await dbConnect();
        const itemsPerPage = Number(req.query.show_per_page) || 20;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const totalItems = await db_shop.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const result = await db_shop.find().skip(page * itemsPerPage).limit(itemsPerPage)

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