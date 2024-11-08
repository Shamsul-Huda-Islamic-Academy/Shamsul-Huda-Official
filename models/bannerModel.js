const mongoose = require('mongoose')

const bannerSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    bannerImage : {
        type : String,
        required : true
    }
})

const collection = new mongoose.model("banner",bannerSchema)
module.exports = collection