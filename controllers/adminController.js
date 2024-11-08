const mongoose = require('mongoose')
const adminModel = require('../models/adminModel')
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
        const adminData = await adminModel.findOne({Email : Email})
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
                    token : token
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
exports.notificationGet = (req,res) => {
    res.render('notification')
}

exports.addNotificationGet = (req,res) => { 
    res.render('addNotification')
}

// add Admin
exports.addAdminGet = (req,res) => {
    res.render('addAdmin')
}