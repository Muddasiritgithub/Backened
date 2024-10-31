const express = require('express');
const { createOrder } = require('../Controllers/orderController');

const router = express.Router();

// POST request to create order
router.post('/orders', createOrder);

module.exports = router;
