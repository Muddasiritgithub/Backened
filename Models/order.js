const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
