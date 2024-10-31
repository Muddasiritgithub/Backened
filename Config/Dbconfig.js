// config/dbconfig.js

const mongoose = require('mongoose');

// Replace the following with your MongoDB connection string
const dbURI = 'mongodb+srv://muddasirbalouch89:nSVbyUhpUcdAeoJ5@testcluster.s1lojlj.mongodb.net/?retryWrites=true&w=majority&appName=Testcluster'; // Example URI for local MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
       useUnifiedTopology: true,
      // Other options can be added here if needed
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
