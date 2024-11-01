const mongoose = require('mongoose')
const adminModel = require('../models/adminModel')
const bcrypt = require('bcrypt')

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
                res.status(200).json({message : 'Login successful'})
            }else{
                res.status(403).json({message : 'Invalid password'})
            }
        }else{
            res.status(403).json({message : 'Invalid email'})
        }
    
    }
    catch(error){
        console.log("Error while login post :",error)
        res.status(500).json({message : 'Internal server error'})
    }
}
