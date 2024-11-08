const express = require('express')
require('dotenv').config()
const dbConnect = require('./config/connection')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
// serving public
// app.use(express.static('./public'))
app.use(express.static(path.join(__dirname, './public')))

// client
const client = require('./routes/clientRouter')
app.use('/',client)

// admin
const admin = require('./routes/adminRouter')
app.use('/admin',admin)

dbConnect()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server running on ${port}`)
    })
})
.catch((error)=>{
    console.log('Database connection failed',error)
})