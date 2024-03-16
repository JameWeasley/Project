import items from '@/Json/Stage.json'
import items_name from '@/Json/Stage_Name.json'
// import items_desc from '@/Json/Stage_Help_String.json'
import items_code from '@/Json/Stage_H.json'

import item_h from '@/Json/Players_H.json'
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
        var item = items
        const data = await Promise.all(item.map(async (d, i) => {
            // var code = await items_code.find(({ id }) => id === d.code)
            var name = await items_name.find(({ item }) => item === d.name)
            // d['code'] = code?.code || d.code
            d['name'] = name?.name || d.name
            // d['lists'] = []

            // let dataArray4 = d.list && typeof d.list === 'string' ? d.list.split(',') : [];
            // dataArray4 && await Promise.all(dataArray4.map(async (dd, ii) => {
            //     var code = await item_h.find(({ code }) => code === dd)
            //     code ? d.lists.push(code.id) : d.lists.push(dd)
            // }))
            return d
        }))

        // await dbConnect()
        // const result = await db_shop.find();

        const itemsPerPage = Number(req.query.show_per_page) || 20;
        const page = Number(req.query.page) ? Number(req.query.page) - 1 : 0;

        const dividedArrays = [];
        for (let i = 0; i < data.length; i += itemsPerPage) {
            const pageArray = data.slice(i, i + itemsPerPage);
            dividedArrays.push(pageArray);
        }
        // res.status(200).json({
        //     current_page: page,
        //     total: Math.ceil(data.length / itemsPerPage) || [],
        //     data: dividedArrays[page]
        // });
        res.status(200).json(data)

    } catch (e) {
        console.log(e)
        res.status(500).json({ msg: e })
    }
}