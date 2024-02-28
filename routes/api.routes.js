const express = require("express")
const router = express.Router()

router.get("/" , (req, res ,next) => {
    return res.render("index")
})

router.get("/login" , (req, res ,next) => {
    return res.render("login")
})

router.post("/login" , (req , res , next) => {
    const { username , password } = req.body
    // ดึงข้อมูลมา
})

module.exports = router