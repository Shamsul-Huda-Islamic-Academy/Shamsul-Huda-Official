const mongoose = require('mongoose')
const adminModel = require('../models/adminModel')
const notificationModel = require('../models/notificationModel')
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const JWT_SECRETE = process.env.JWT_SECRET

exports.loginGet = (req,res) => {   
    res.render('login')
}

exports.loginPost =async (req,res) =>{
    try{
        const loginData = req.body
        const {Email,password : inputPassword} = loginData
        const adminData = await adminModel.findOne({email : Email})
        console.log("Email received:", Email);
    
        if(adminData){


            if(adminData.password === inputPassword){
                // const token = jwt.sign(
                //     {adminId : adminData._id},
                //     JWT_SECRETE,
                //     {expiresIn : '1h'}
                // ) 
                res.status(200).json({
                    data : "Logged in succesfully",
                    // token : token
                })    
                           
                // return res.redirect('/admin/dashboard')
                // res.status(200).json({message : 'Login successful'})
            }else{
             console.log("Your pass is incorrect")
             res.status(403).json({data : "Check your password"})   
            }
        }else{
            console.log("Admin details is wrong")
            res.status(403).json({data : "Check your admin details"})
        }
    
    }
    catch(error){
        console.log("Error while login post :",error)
        res.status(500).json({message : 'Internal server error'})
    }
}

// dashboard 
exports.dashboardGet = (req,res) =>{
    res.render('dashboard')
}
// notification
exports.notificationGet = async (req,res) => {
    try{
        const notifications = await notificationModel.find()

        res.render('notification',{notifications})
    }
    catch(err){
        console.log('Error while getting notfication : ',err)
        res.status(500).json({message : 'Notification getting failed'})
    }
}

exports.addNotificationGet = (req,res) => { 
    res.render('addNotification')
}

exports.addNotificationPost = async (req,res) => {
    try{
        const {notification} = req.body

        const data = new notificationModel({
            notification : notification
        })

        await data.save()
        res.redirect('/admin/notification')
    }
    catch(err){
        console.log("Error while adding notification : ",err)
    }
}

exports.updateNotficationGet = async (req,res) => {
    try{
        const notification = await notificationModel.findOne()

        res.render('updateNotification',{notification})
    }
    catch(err){
        console.log("Error while getting notification upodation details : ",err)
        res.status(500).json({message : 'Update notification is not getting'})
    }
}

exports.updateNotificationPost = async(req,res) => {
    try{
        const {notification} = req.body
        const notificationId = req.params.id
        const Notification = await notificationModel.findOneAndUpdate({_id : notificationId},{$set : {notification : notification}},{new : true,upsert : true})
        
        if(Notification){
            const updateNotification = {
                notification : notification
            }
            await notificationModel.findOne({_id : notificationId},{$set : updateNotification},{upsert : true})
            res.redirect('/admin/notification')
        }
    }
    catch(err){
        console.log("Error while updating the notification : ",err)
        res.status(500).json({message : "Error while updating notification"})
    }
}

// add Admin
exports.addAdminGet = (req,res) => {
    res.render('addAdmin')
}