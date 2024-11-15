const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
    notification : {
        type : String, 
        required : true 
    }
})
const collection = mongoose.model("notification",notificationSchema)
module.exports = collection