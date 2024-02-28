const express = require("express")
const cors = require('cors');
const path = require('path')
const app = express()
const multer = require("multer")

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('views'));
app.use("/" , express.static(path.join(__dirname , 'views')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require("./routes/routes"))

app.use((req , res , next) => {
    return res.render("notfound")
})

app.listen(80 , () => {
    console.log("Running Port 80");
})