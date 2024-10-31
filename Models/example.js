const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const exampleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Create the model
const example = mongoose.model('example', exampleSchema);

module.exports = example;
