const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs'); // For hashing passwords

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: '' // Make image field optional
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
