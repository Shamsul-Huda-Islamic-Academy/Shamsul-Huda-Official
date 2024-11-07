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
adminRouter.get('/dashboard',adminController.dashboardGet)

// event 
adminRouter.get('/event',adminController.eventGet)
adminRouter.get('/addEvent',adminController.addEventGet)
// activity
adminRouter.get('/activity',adminController.activityGet)
adminRouter.get('/addActivity',adminController.addActivityGet)

// banner 
adminRouter.get('/banner',adminController.bannerGet)
adminRouter.get('/addBanner',adminController.addBannerGet)

// notification
adminRouter.get('/notification',adminController.notificationGet)
adminRouter.get('/addNotification',adminController.addNotificationGet)


module.exports = adminRouter