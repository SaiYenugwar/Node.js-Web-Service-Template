const express = require('express');
const { loginUser } = require('../Controller/authController');
const { registerUser } = require('../Controller/authController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;
