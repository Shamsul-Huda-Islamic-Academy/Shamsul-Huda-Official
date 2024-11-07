const multer = require('mongoose')

const  storage = multer.diskStorage ({
    destination : function (req,file,cb) {
        if(file.fieldname === 'image'){
            cb(null, './public/photos/upload/images')
        }
        else{
            cb(null, './public/photos/upload/other')
        }
    },
    filename : function(req,file,cb){
        const uniqueSuffix = Date.now + '-' + file.originalname
        cb(null, uniqueSuffix)
    }
})