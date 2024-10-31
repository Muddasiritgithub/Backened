const express=require("express");
const router=express.Router();
const user= require('../Controllers/userController');
const firebaseUpload=require("../Helpers/firebase");
const multerUpload=require("../Middleware/uploadMiddleware");
const userload = require('../Controllers/users');  
 

 router.post("/register", multerUpload.single("image"), firebaseUpload, userload.adduser);


router.post('/login', user.userLogin);
router.post('/getUserByEmail',userload.getUserByEmail)
router.post('/UpdatePassword',userload.UpdatePassword)


module.exports=router;