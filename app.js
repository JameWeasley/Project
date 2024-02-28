const express = require("express")
const cors = require('cors');
const path = require('path')

// Front End
const app = express()


app.use(express.static('views'));
app.use("/" , express.static(path.join(__dirname , 'views')))
app.set('views', path.join(__dirname, 'views'));
app.set("view engine" , "ejs")

app.use(require("./routes/routes"))

app.listen(80 , () => {
    console.log("Front End Running Port 80");
})