require('dotenv').config()
const express = require("express");
const BodyParser  = require('body-parser')
const cors  = require("cors");
const mongoose = require('mongoose')
const Notes =  require('./Notes/NotesRoutes')


const  app = express()
const PROT = 3001
const MONGODB_URL  = process.env.MONGODB_URL
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("<h1>Server Running</h1>")
})

app.use('/api', Notes)

app.listen(PROT, () => {
    console.log(`server running from  http://localhost:${PROT}`)
    mongoose.connect(MONGODB_URL).then(() => {
        console.log("MOngoose Connected")
    }).catch(() => {
        console.log("mongoose Disconnected")
    })
})
