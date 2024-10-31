const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  Discription: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const category = mongoose.model("category", categorySchema);

module.exports = category;
