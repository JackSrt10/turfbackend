const express = require('express');
const { authenticate } = require('../middlewares/auth');
const {turfList} = require('../controllers/user/user'); 


const router = express.Router();
router.get('/turf', turfList);


router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;