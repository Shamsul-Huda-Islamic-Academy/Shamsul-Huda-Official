const express = require('express')
const adminRouter = express()
const adminController = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');

adminRouter.use(express.json())
adminRouter.use(express.urlencoded({ extended: true }));
adminRouter.set('view engine','ejs')
adminRouter.set('views','./views/admin')

// login page
adminRouter.get('/login',adminController.loginGet)
adminRouter.post('/login',adminController.loginPost)

// dashboard
adminRouter.get('/dashboard',authenticateToken, adminController.dashboardGet)
adminRouter.post('/dashboard',authenticateToken, adminController.dashboardPost)

module.exports = adminRouter