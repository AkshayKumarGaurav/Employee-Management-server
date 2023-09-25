const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { UserRouter } = require('./route/User.Routes');
require('dotenv').config()

const app = express();
app.use(cors())
app.use(express.json())
app.use('/users',UserRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log('conncted to db')
    } catch (error) {
        console.log(error)
    }
    console.log(`server running at ${process.env.port}`)
})
