const express = require('express')
require('dotenv').config()

const dbConnect = require('./config/connection')

const app = express()
const port = process.env.PORT || 5000

dbConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on ${port}`)
    })
})
.catch((error)=>{
    console.log('Database connection failed',error)
})