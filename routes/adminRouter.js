const express = require('express')
const adminRouter = express()
const adminController = require('../controllers/adminController')

adminRouter.use(express.json())
adminRouter.use(express.urlencoded({ extended: true }));
adminRouter.set('view engine','ejs')
adminRouter.set('views','./views/admin')

// login page
adminRouter.get('/login',adminController.loginGet)

module.exports = adminRouter