const multer = require('multer')

const Storage = multer.diskStorage ({
    destination : function (req,file,cb) {
        if(file.fieldname === 'eventImage'){
            cb(null, './public/photos/upload/events/')
        }
        else if(file.fieldname === 'activityImage') {
            cb(null, './public/photos/upload/activity/')
        }else if(file.fieldname === 'bannerImage'){
            cb(null, './public/photos/upload/banner/')
        }
    },
    filename : function(req,file,cb){
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix)
    }
})

module.exports = Storage