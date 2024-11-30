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
adminRouter.post('/addEvent',upload.single('eventImage'),eventController.addEventPost)
adminRouter.get('/eventDetails/:id',eventController.eventDetails)
adminRouter.get('/updateEvent/:id',eventController.updateEventGet)
adminRouter.post('/updateEvent/:id',upload.single('eventImage'),eventController.updateEventPost)
adminRouter.post('/deleteEvent/:id',upload.single('eventImage'),eventController.deleteEvent)
// activity
adminRouter.get('/activity',activityController.activityGet)
adminRouter.get('/addActivity',activityController.addActivityGet)
adminRouter.post('/addActivity',upload.single('activityImage'), activityController.addActivityPost)
adminRouter.get('/updateActivity/:id',activityController.updateActivityGet)
adminRouter.post('/updateActivity/:id',upload.single('activityImage'),activityController.updateActivityPost)
adminRouter.get('/activityDetail/:id',activityController.activityDetailGet)
adminRouter.post('/activityDelete/:id',upload.single('activityImage'),activityController.deleteActivity)
// banner 
adminRouter.get('/banner',bannerController.bannerGet)
adminRouter.get('/addBanner',bannerController.addBannerGet)
adminRouter.post('/addBanner',upload.single('bannerImage'),bannerController.addBannerPost)
adminRouter.get('/updateBanner/:id',bannerController.updateBannerGet)
adminRouter.post('/updateBanner/:id',upload.single('bannerImage'),bannerController.updateBannerPost)
adminRouter.post('/deleteBanner/:id',upload.single('bannerImage'),bannerController.deleteBanner)

// notification
adminRouter.get('/notification',adminController.notificationGet)
adminRouter.get('/addNotification',adminController.addNotificationGet)
adminRouter.post('/addNotification',adminController.addNotificationPost)
adminRouter.get('/updateNotification/:id',adminController.updateNotficationGet)
adminRouter.post('/updateNotification/:id',adminController.updateNotificationPost)
adminRouter.post('/deleteNotification/:id',upload.single('notificationImage'),adminController.deleteNotification)
// add Admin
adminRouter.get('/addAdmin',adminController.addAdminGet)

module.exports = adminRouter