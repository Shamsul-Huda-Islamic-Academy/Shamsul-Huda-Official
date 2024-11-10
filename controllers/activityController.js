require('dotenv').config()
const multer = require('multer')
const mongoose = require('mongoose')
const Storage = require('../utilities/multer')
const upload = multer({storage : Storage})
const activityModel = require('../models/activityModel')

// activity 
exports.activityGet = async (req,res) => {
    try{
        const activities = await activityModel.find()
        res.render('activity',{activities})
    }
    catch(error){
        console.log('Error while passing data to activity page')
    }
}

exports.addActivityGet = (req,res) => {
    res.render('addActivity')
}

exports.addActivityPost = async (req,res) => { 
    try{
        const {title, description} = req.body
        const image = req.file
    
        const path = '/photos/upload/activity'+image.filename;
        const data = new activityModel({
            title, 
            description,
            activityImage : path
        })
        await data.save()
        console.log(path)
    
        res.redirect('/admin/activity')
    }
    catch(error){
        console.log('Error while adding activity data',error)
    }
}
exports.updateActivityGet = (req,res) => {
    res.render('updateActivity')
}