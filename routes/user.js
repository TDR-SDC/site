const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controller/userController');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.post('/upload_avatar', passport.checkAuthentication, userController.upload_avatar);
router.get('/user_info', function(req, res){
    res.send(req.user);
    console.log(req.user);
});
module.exports = router;
