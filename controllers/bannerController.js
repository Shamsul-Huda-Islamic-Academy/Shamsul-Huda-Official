const mongoose = require('mongoose')
require('dotenv').config()
const bannerModel = require('../models/bannerModel')
const activityModel = require('../models/activityModel')


// banner
exports.bannerGet = async (req,res) => {
    try{
        const banners = await bannerModel.find()
        res.render('banner',{banners})
    }
    catch(err){
        console.log("Error while getting banner page : ",err)
        res.status(500).json({message : "Banner page getting failed"})
    }
}

exports.addBannerGet = (req,res) => { 
    res.render('addBanner')
}
exports.addBannerPost = async (req,res) => {
    try{
        const {title, description} = req.body
        const image = req.file
        
        const path = '/photos/upload/banner'+image.filename
        const data = new bannerModel({
            title, 
            description, 
            bannerImage : path
        })
        await data.save()
        res.redirect('/admin/banner')
    }
    catch(err){
        console.log("Error while adding banner")
        res.status(500).json({message : "Adding banner failled"})
    }
}
exports.updateBannerGet = async (req,res) => {
    try{
        const banner = await bannerModel.findOne({ _id : req.params.id})
        res.render('updateBanner',{banner})
    }
    catch(err){
        console.log("Error while updating the banner : ",err)
        res.status(500).json({message : 'Error while updating your banner'})
    }
}
exports.updateBannerPost = async (req,res) => {
    try{
        const {title,description} = req.body
        const image = req.file
        const bannerId =  req.params.id
        console.log("Banner ID : ",req.params.id)
        if(!mongoose.Types.ObjectId.isValid(bannerId)){
            return res.status(400).json({message : "Invalid banner ID"})
        }
        const banner = await bannerModel.findOne({_id : bannerId})

        if(banner){
            const updateBanner = {
                title, 
                description
            }
            if(req.file){
                const newImage = '/photos/upload/banner/'+image.filename
                updateBanner.image = newImage
            }
            await bannerModel.updateOne({_id : bannerId},{$set : updateBanner},{upsert : true})
            res.redirect('/admin/banner')
        }
    }
    catch(err){
        console.log("Error while updating banner : ",err)
        res.status(500).json({message : "Banner updation failed"})
    }
}

// delete
exports.deleteBanner = async (req,res) => {
    try{
        const bannerId = req.params.id;
        console.log(bannerId)
        const banner = await bannerModel.findOne({_id : bannerId})

        if(banner){
            await bannerModel.deleteOne({_id : bannerId})
            res.redirect('/admin/banner')
        }else{
            res.status(404).json({message : "Banner not found"})
        }
    }
    catch(err){
        console.log("Error while deleting banner : ",err)
        res.status(500).json({message : "Deleting banner failed"})
    }
}