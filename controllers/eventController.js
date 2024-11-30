const mongoose = require('mongoose')
require('dotenv').config()
const eventModel = require('../models/eventModel')
const multer = require('multer')
const Storage = require('../utilities/multer')
const path = multer({storage : Storage})

// Events 
exports.eventGet = async (req,res) => {
    const events = await eventModel.find()
    res.render('event',{events})
}

// add event
exports.addEventGet = (req,res) => {
    res.render('addEvent')
}

exports.addEventPost = async (req,res) => {
    try{
        const {title, description} = req.body
        const image = req.file

        const path = '/photos/upload/event' + image.filename
        const data = new eventModel({
            title, 
            description, 
            eventImage : path
        })
        await data.save()
        res.redirect('event')
    }
    catch(error){
        console.log("Error while uploading event : ",error)
        res.status(500).json({message : "Event uploading failed"})
    }
}

// Details 
exports.eventDetails = async (req,res) => {
    try{
        const eventId = req.params.id
        const event = await eventModel.findOne({_id : eventId})

        if(!event) return res.status(400).json({message : "Event detail not found"})
        res.render('eventDetails',{event})
    }
    catch(err){
        console.log("Error while getting event details : ",err)
        res.status(500).json({message : "Getting event detail failed"})
    }
}

// update
exports.updateEventGet = async (req,res) => {
    try{
        const event = await  eventModel.findOne({_id : req.params.id})

        res.render('updateEvent',{event})
    }
    catch(err){
        console.log("Error while get event update page : ",err)
        res.status(500).json({message : "Getting event update page failed"})
    }
}

exports.updateEventPost = async (req,res) => {
    try{
        const {title,description} = req.body
        const image = req.file
        const eventId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            return res.status(400).json({message : "Invalid event ID "})
        }
        
        const event = await eventModel.findOne({_id : eventId})

        if(event){
            const updateEvent = {
                title,
                description
            }
            if(req.file){
                const newImage = '/photos/upload/event/' + image.filename
                updateEvent.image = newImage
            }
            await eventModel.updateOne({_id : eventId},{$set : updateEvent},{upsert : true})
            res.redirect('/admin/event')
        }

    }
    catch(err){
        console.log("Error while updating event : ",err)
        res.status(500).json({message : "Updating event failed"})
    }
}

// delete
exports.deleteEvent = async (req,res) => {
    try{
        const eventId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(eventId)){
            res.status(400).json({message : " Invalid event ID"})
        }
        console.log(eventId)
        const event = await eventModel.findOne({_id : eventId})

        if(event){
            await eventModel.deleteOne({_id : eventId})
            res.redirect('/admin/event')
        } else {
            res.status(400).json({message : "Event ID is invalid"})
        }
    }
    catch(err){
        console.log("Error while deleting event : ",err)
        res.status(500).json({message : "Deleting event failed"})
    }
}