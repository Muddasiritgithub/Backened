const express = require("express");
const router = express.Router();
 const categoryController = require('../Controllers/categoryController')
const firebaseUpload = require("../Helpers/firebase");
const multerUpload = require("../Middleware/uploadMiddleware");

router.post("/createCategory", multerUpload.single("image"), firebaseUpload, categoryController.createCategory)
router.get("/getAllCategories",  categoryController.getAllCategories)



module.exports = router;
