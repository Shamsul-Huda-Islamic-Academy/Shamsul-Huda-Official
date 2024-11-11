const express = require('express')
const adminRouter = express()
const Storage = require('../utilities/multer')
const multer = require('multer')
const upload = multer({storage : Storage})

const adminController = require('../controllers/adminController');
const eventController = require('../controllers/eventController');
const bannerController = require('../controllers/bannerController');
const activityController = require('../controllers/activityController')

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
adminRouter.get('/event',eventController.eventGet)
adminRouter.get('/addEvent',eventController.addEventGet)
// activity
adminRouter.get('/activity',activityController.activityGet)
// activity add
adminRouter.get('/addActivity',activityController.addActivityGet)
adminRouter.post('/addActivity',upload.single('activityImage'), activityController.addActivityPost)
// activity edit
adminRouter.get('/updateActivity/:id',activityController.updateActivityGet)
adminRouter.post('/updateActivity/:id',upload.single('activityImage'),activityController.updateActivityPost)
// activity delete
adminRouter.post('/activityDelete/:id',activityController.deleteActivity)
// activity Detail
adminRouter.get('/activityDetail/:id',activityController.activityDetailGet)
// banner 
adminRouter.get('/banner',bannerController.bannerGet)
adminRouter.get('/addBanner',bannerController.addBannerGet)

// notification
adminRouter.get('/notification',adminController.notificationGet)
adminRouter.get('/addNotification',adminController.addNotificationGet)

// add Admin
adminRouter.get('/addAdmin',adminController.addAdminGet)

module.exports = adminRouter