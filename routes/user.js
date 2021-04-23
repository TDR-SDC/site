const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.post('/upload_avatar', passport.checkAuthentication, userController.upload_avatar);
router.get('/user_info', userController.user_info);
router.post('/create', userController.create);
router.post('/update_credentials', userController.update_credentials);
router.get('/logout', userController.logout);

router.get('*', userController.profile);
module.exports = router;
