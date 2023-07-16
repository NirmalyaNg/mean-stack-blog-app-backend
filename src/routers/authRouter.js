const express = require('express');
const router = new express.Router();
const { login, signup } = require('../controllers/authController');

// Login
router.post('/login', login);

// Signup
// router.post('/signup', signup);

module.exports = router;
