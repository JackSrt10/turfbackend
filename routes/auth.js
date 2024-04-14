const express = require('express');
const { register, login, verifySignUpOtp,verifyLoginOtp,turfList } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifySignUpOtp);
router.post('/login-otp', verifyLoginOtp);
router.get('/turf', turfList)

module.exports = router;