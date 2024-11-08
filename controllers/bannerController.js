const mongoose = require('mongoose')
require('dotenv').config()
const bannerModel = require('../models/bannerModel')
const activityModel = require('../models/activityModel')


// banner
exports.bannerGet = (req,res) => {
    res.render('banner')
}

exports.addBannerGet = (req,res) => { 
    res.render('addBanner')
}