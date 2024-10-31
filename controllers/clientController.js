const mongoose = require('mongoose')

exports.indexGet = (req,res) => {
    res.render('index')
}