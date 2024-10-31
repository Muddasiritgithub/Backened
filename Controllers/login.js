require('dotenv').config(); // Load environment variables from .env file

const User = require('../Models/user'); 
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    console.log('api called')
  try {
    console.log('body is',req.body)
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email:email });
    console.log('User found:', user);
      console.log('email found:', email);
      console.log('pass found:', password);
        
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await user.comparePassword(password);

    // Log password comparison result
    console.log('Hashed Password:', user.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.email }, process.env.JSON_WEBTOKEN_SECRET, { expiresIn: '1h' });
    // Respond with success if the email and password match
    res.status(200).json({ message: 'Login successful',token: token});
  } catch (error) {
    console.log('error',error)
    res.status(500).json({ message: 'Error logging in', error });
  }
};

