const express = require('express');
const { register, login, verifySignUpOtp,verifyLoginOtp } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifySignUpOtp);
router.post('/login-otp', verifyLoginOtp);

module.exports = router;