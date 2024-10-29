const mongoose = require('mongoose')

async function dbConnect(){
    await mongoose.connect(process.env.MONGOURL,{
        dbName : 'shiaDB'
    })
    .then(()=>{
        console.log('MongoDB connected succesfully')
    })
    .catch((error)=>{
        console.log('MongoDB connection failed',error)     
    })
}

module.exports = dbConnect