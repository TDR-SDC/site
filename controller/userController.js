const Users = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    if (req.isAuthenticated())
        Users.findById(req.user._id, function (err, user) {
            return res.render('profile', {
                profile_user: user
            });
        });
    else res.redirect('/login');
};

module.exports.upload_avatar = async function (req, res) {
    var user = await Users.findById(req.user._id);
    Users.uploadedAvatar(req, res, function (err) {
        if (req.file) {
            if (user.avatar) {
                fs.unlinkSync(path.join(__dirname, '..', user.avatar));
            }
            user.avatar = Users.avatarPath + '/' + req.file.filename;
        }
        user.save();
        res.redirect('/user/profile');
    });
};
