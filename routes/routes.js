const express = require("express")
const router = express.Router()

router.use("/" , require("./api.routes"))

module.exports = router