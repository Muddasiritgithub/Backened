const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  signedUp: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
