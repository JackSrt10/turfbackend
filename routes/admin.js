const express = require('express');
const {turfAdminUser} = require('../controllers/admin/admin'); 
const {login,verifyLoginOtp} = require('../controllers/auth/admin_auth'); 

const router = express.Router();
router.get('/turfUser',turfAdminUser)
router.post('/admin_login', login);
router.post('/admin_login-otp', verifyLoginOtp);




module.exports = router;