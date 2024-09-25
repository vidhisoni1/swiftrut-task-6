// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Register and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
