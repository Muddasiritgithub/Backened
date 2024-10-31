const usermodel = require('../Models/user'); // Import the User model
const firebase = require('../Helpers/firebase'); // Ensure this is your correct path
const bcrypt = require('bcryptjs'); // For hashing passwords

exports.adduser = async (req, res) => {
  console.log("API called");
  console.log("Body is", req.body);
  
  try {
    const { email, password, firstName, lastName, City, phoneNumber, zipCode } = req.body;

    console.log("User email:", email);
    console.log("User password:", password);
    console.log("User phoneNumber:", phoneNumber);
    console.log("User zipCode:", zipCode);
    console.log("User City:", City);

    // Check if user already exists
    const existingUser = await usermodel.findOne({ email });  // Change here
    console.log("existingUser",existingUser)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Get the image URL from Firebase upload, if available
    let imagePath = '';
    if (req.file && req.file.firebaseUrl) {
      imagePath = req.file.firebaseUrl; // Use Firebase URL
    }

    // Create a new user instance
    const newUser = new usermodel({
      email,
      password,
      firstName,
      lastName,
      image: imagePath, // Include the image URL
      zipCode,
      phoneNumber,
      City
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser,
      publicUrl: req.file.firebaseUrl
    });
  } catch (error) {
    console.log("Error:", error);  // More detailed logging
    res.status(500).json({ message: 'Error creating user', error });
  }
};



exports.getuser = (req, res) => {
  const user = { name: "Balouch", age: 22, salary: 50000, company: "Alfain Technology" };
  delete user.salary;
  res.status(200).send(user);
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usermodel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customers', error });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    console.log("body:", req.body);  // Logging query parameters
    const { email } = req.body;  

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const User = await usermodel.findOne({ email });

    if (!User) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customer', error });
  }
};

exports.UpdatePassword = async (req, res) => {
  try {
    const { email,  newPassword } = req.body;

    if (!email ||  !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user by email
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password is correct
    // const isMatch = await user.comparePassword(currentPassword);

    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Current password is incorrect' });
    // }

    // Update the password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error); // Log the error
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};

