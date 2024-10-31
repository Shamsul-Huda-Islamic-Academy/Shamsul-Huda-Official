const mongoose = require('mongoose')
const adminModel = require('../models/adminModel')

exports.loginGet = (req,res) => {   
    res.render('login')
}
