const express = require('express')
const dbConnect = require('./config/connection')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

dbConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on ${port}`)
    })
})
.catch((error)=>{
    console.log('Database connection failed',error)
})