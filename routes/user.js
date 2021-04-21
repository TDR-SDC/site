const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');

router.get('/profile', passport.checkAuthentication, userController.profile);

module.exports = router;
