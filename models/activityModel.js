const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    title : {
        type : String,
        required : true 
    },
    description : {
        type : String,
        required : true
    },
    activityImage : {
        type : String, 
        required : true
    }
})

const collection = new mongoose.model('activity',activitySchema)
module.exports = collection