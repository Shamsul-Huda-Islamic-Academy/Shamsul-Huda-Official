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

exports.activityDetailGet = async (req,res) => {
    try{
        const detailId = req.params.id
        const detail = await activityModel.findById(detailId)
        if(!detail) res.status(404).send('Detail not found')
        res.render('activityDetail',{detail})
    }
    catch(error){
        console.log("Error while getting activity details: ",error)
        res.status(500).json({message : "Error while getting activity details"})
    }
}

exports.addActivityGet = (req,res) => {
    res.render('addActivity')
}

exports.addActivityPost = async (req,res) => { 
    try{
        const {title, description} = req.body
        const image = req.file
    
        const path = '/photos/upload/activity/'+image.filename
        const data = new activityModel({
            title, 
            description,
            activityImage : path
        })
        await data.save()
    
        res.redirect('/admin/activity')
    }
    catch(error){
        console.log('Error while adding activity data',error)
    }
}
// update
exports.updateActivityGet = async (req,res) => {
    try{
        const activity = await activityModel.findOne({_id : req.params.id})
    
        res.render('updateActivity',{activity})
    }
    catch(error){
        console.log("Error while entering to edit page : ",error)
        res.status(500).json({message : "Update page is not getting"})
    }
}
exports.updateActivityPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { id: activityId } = req.params;
        const activity = await activityModel.findById(activityId);

        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        const updateData = { title, description };

        if (req.file) {
            const newImage = `/photos/upload/activity/${req.file.filename}`;
            updateData.activityImage = newImage;
        }

        await activityModel.updateOne({ _id: activityId }, { $set: updateData });

        res.redirect('/admin/activity');
    } catch (error) {
        console.error("Error while updating the activity", error);
        res.status(500).json({ message: "Updating activity failed" });
    }
};

// delete 
exports.deleteActivity = async (req,res) => {
    try{
        const activityId = req.params.id
        const activity = await activityModel.findOne({_id : activityId})

        if(activity)
        await activityModel.deleteOne({_id : activityId})
        res.redirect('/admin/activity')
    }
    catch(error){
        console.log("Error while deleting the activity : ",error)
        res.status(500).json({message : 'Deleting the activity failed'})
    }
}