const multer = require("multer");

const storage=multer.memoryStorage();

const upload=multer({
    storage:storage,
    fileFilter:function (req,file,cb){
        if(file.mimetype.startsWith("image/") || file.mimetype ==='application/pdf' || file.mimetype === 'text/csv'){
            cb(null,true)
        }else{
            cb(new Error("Unsported file"),false);
        }
    }
});

module.exports=upload;