import mongoose from 'mongoose'
var shops_data = mongoose.Schema({
    code: {
        type: String
    },
    ShopName: {
        type: String
    },
    ShopCost: {
        type: String
    },
    shop_bg: {
        type: String
    },
    boss_shp: {
        type: String
    },
    boss_head: {
        type: String
    },
    boss_name: {
        type: String
    },
    boss_msg: {
        type: String
    },
    ShopType: {
        type: String
    },
    Item: {
        type: String
    },
    items: {
        type: [String]
    },
    image: {
        type: String
    },
}, {
    collection: "shops",
    versionKey: false
});

var noname = mongoose.models.shops || mongoose.model("shops", shops_data);
module.exports = noname;