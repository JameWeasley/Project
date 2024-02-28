const express = require("express")
const router = express.Router()
const connect = require("../Controller/connect")
const RangeParser = require("range-parser")

router.get("/" , (req, res ,next) => {
    return res.render("index")
})

router.get("/login" , (req, res ,next) => {
    return res.render("login")
})

router.post("/login" , (req , res , next) => {
    const { username , password } = req.body
    // ดึงข้อมูลมา
    const userexist = connect.userSelect(username , password);
    if (userexist) {
        res.render("index")
    } else {
        res.render("login", {
            error: "Not Found"
        })
    }
})

module.exports = router