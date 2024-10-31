const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    Email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
})

const collection = new mongoose.model("Admin",adminSchema)
module.exports = collection