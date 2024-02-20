const express = require("express")
const cors = require('cors');
const path = require('path')

// Front End
const app = express()

app.use(express.static('views'));
app.use("/" , express.static(path.join(__dirname , 'views')))
app.set('views', path.join(__dirname, 'views'));

app.listen(80 , () => {
    console.log("Front End Running Port 80");
})


// Backend

const app_backend = express()

app_backend.use(cors());

app_backend.use(express.urlencoded({ extended: false }))
app_backend.use(express.json())

app_backend.get("/" , (req , res) => {
    console.log("yes");
    res.send("สวัสดีครับ")
})

app_backend.listen(500 , () => {
    console.log("Backend Running Port 500");
})