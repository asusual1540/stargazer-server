const express = require('express')
const cors = require('cors')
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const BodyParser = require("body-parser")
const su = require("./src/modules/super_admin")


const port = process.env.PORT || 4000


app.use(express.static(path.join(__dirname, "build")))

app.use(cors())

app.use(BodyParser.json({ limit: '50mb' }))
app.use(BodyParser.urlencoded({ extended: true }))


app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "https://mighty-harbor-63745.herokuapp.com/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



mongoose
    .connect(
        "mongodb://adnan:adnan1540@ds255329.mlab.com:55329/stargazer",
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .then(() => {
        console.log("Successfully connected to Mongodb")
    })
    .catch(err => {
        console.log(err.message)
    })



app.get('/xyz', (req, res) => {
    res.status(200).json({ "msg": "bingo" })
    res.end()
})



const events = [
    {
        title: "Drummer's Fest",
        date: "26",
        month: "November",
        type: "Upcoming Event",
        description: `Page editors now use Lorem Ipsum
                          as their default model text.Page
                          editors now use Lorem Ipsum
                          as their default model text
                          `,
        location: "Dhaka, Bangladesh",
        images: ["/images/gallery_1.png", "/images/gallery_2.png", "/images/gallery_3.png"]
    },
    {
        title: "Joy Bangla Concert",
        date: "16",
        month: "December",
        type: "Music Festivals",
        description: `Page editors now use Lorem Ipsum
                          as their default model text.Page
                          editors now use Lorem Ipsum
                          as their default model text
                          `,
        location: "Dhaka, Bangladesh",
        images: ["/images/gallery_1.png", "/images/gallery_2.png", "/images/gallery_3.png"]
    },
    {
        title: "Joy Bangla Concert",
        date: "16",
        month: "December",
        type: "Music Festivals",
        description: `Page editors now use Lorem Ipsum
                          as their default model text.Page
                          editors now use Lorem Ipsum
                          as their default model text
                          `,
        location: "Dhaka, Bangladesh",
        images: ["/images/gallery_1.png", "/images/gallery_2.png", "/images/gallery_3.png"]
    },
    {
        title: "Joy Bangla Concert",
        date: "16",
        month: "December",
        type: "Music Festivals",
        description: `Page editors now use Lorem Ipsum
                          as their default model text.Page
                          editors now use Lorem Ipsum
                          as their default model text
                          `,
        location: "Dhaka, Bangladesh",
        images: ["/images/gallery_1.png", "/images/gallery_2.png", "/images/gallery_3.png"]
    },
]



app.get("/get_all_events", (req, res) => {
    res.status(200).json({ events })
    res.end()
})


app.post('/admin_login', (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body)
    res.end()
})

app.post('/create_super_admin', async (req, res) => {
    console.log(req.body)
    await su.create_super_admin(req.body.username, req.body.password, req.body.secret)
    const token = await su.super_admin_login(req.body.username, req.body.password)
    res.status(200).json(token)
    res.end()
})


app.get('*', (req, res) => {

    res.status(200).json({ "msg": "hmm" })
})

// path.join(__dirname, 'build', 'index.html')



app.listen(port, function () {
    console.log(`server started on port ${port}`)
})