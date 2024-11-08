const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    description : {
        type : String, 
        required : true
    },
    eventImage : {
        type : String, 
        required : true 
    }
})

const collection = new mongoose.model("event",eventSchema)
module.exports = collection