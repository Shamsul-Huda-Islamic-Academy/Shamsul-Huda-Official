const mongoose = require('mongoose')
require('dotenv').config()
const eventModel = require('../models/eventModel')
const multer = require('multer')
const Storage = require('../utilities/multer')
const path = multer({storage : Storage})

// Events 
exports.eventGet = (req,res) => {
    res.render('event')
}

exports.addEventGet = (req,res) => {
    res.render('addEvent')
}
