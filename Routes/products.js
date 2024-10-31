const express = require("express");
const router = express.Router();
const productController = require('../Controllers/productController'); // Assuming you have a productController
const categoryController = require('../Controllers/categoryController')
const firebaseUpload = require("../Helpers/firebase");
const multerUpload = require("../Middleware/uploadMiddleware");

router.get("/getAllProducts", multerUpload.single("image"), firebaseUpload, productController.getAllProducts);
router.post("/createProduct", multerUpload.single("image"), firebaseUpload, productController.createProduct)
 

module.exports = router;
