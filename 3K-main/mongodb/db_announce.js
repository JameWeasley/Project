import mongoose from 'mongoose'
var announce_data = mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    order: {
        type: Number
    },
}, {
    collection: "announce",
    versionKey: false
});

var noname = mongoose.models.announce || mongoose.model("announce", announce_data);
module.exports = noname;