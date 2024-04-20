const express = require('express');
const { authenticate } = require('../middlewares/auth');
const {turfList,profileDetails} = require('../controllers/user/user'); 


const router = express.Router();
router.get('/turf', turfList);

router.get('/profile',profileDetails);

module.exports = router;