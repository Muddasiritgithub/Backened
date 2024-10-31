const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');

// Example of a protected route
router.get('/dashboard', auth, (req, res) => {
  res.json({ msg: 'Welcome to your dashboard!', user: req.user });
});

module.exports = router;
