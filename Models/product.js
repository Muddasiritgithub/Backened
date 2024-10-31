const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  Title: {
    type: String,
    required: true  
  },
  Price: {
    type: Number,
    required: true
  },
  Discription: {
    type: String,
    required: true
  },
  Model: {
    type: Number,
    required: true,
    min: 0 // Ensure student strength is a non-negative number
  },
  Camera: {
    type: String,
    required: true
  },
  Ram: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  MadeIn: {
    type: String,
    required: true
  },
  Proccessor: {
    type: String,
    required: true
  },
  Quantity: {
    type: Number,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  SubCategory: {
    type: String,
    required: true
  },

});

// Create a model from the schema
const product = mongoose.model('product', productSchema);

module.exports = product;
