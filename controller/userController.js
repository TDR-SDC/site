const Users = require('../models/users');
const fs = require('fs');
const path = require('path');
const azure = require('azure-storage');

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
    Users.uploadedAvatar(req, res, async function (err) {
        var blobService = azure.createBlobService();
        blobService.createBlockBlobFromLocalFile('team-members', `${req.file.originalname}`, `${req.file.path}`, function (err, result, response) { });

        var avatarUrl = blobService.getUrl("team-members", `${req.file.originalname}`);
        user.avatar = avatarUrl;
        user.save();
    });
    res.redirect('/user');
};

module.exports.create = async function (req, res) {
    var permission = 10;
    if (req.body.year == 1)
        permission = 9;
    if (req.body.year == 2)
        permission = 8;
    if (req.body.year == 3)
        permission = 7;
    if (req.body.year == 4)
        permission = 10;
    if (req.body.position.toLowerCase().includes('lead'))
        permission = 3;
    if (req.body.position.toLowerCase().includes('manager'))
        permission = 2;
    if (req.body.position.toLowerCase().includes('team lead'))
        permission = 1;

    await Users.create({
        "user": req.body.user,
        "name": req.body.name,
        "password": req.body.password,
        "dept": req.body.dept,
        "year": req.body.year,
        "position": req.body.position,
        "permission": permission
    });
    res.redirect('/user/profile');
};

module.exports.update_credentials = async function (req, res) {
    var user = User.findById(req.user._id);
    if (req.body.name)
        user.name = req.body.name;
    if (req.body.password)
        user.password = req.body.password;
    if (req.body.insta)
        user.social.insta = req.body.insta;
    if (req.body.linkedin)
        user.social.linkedin = req.body.linkedin;
    if (req.body.twitter)
        user.social.twitter = req.body.twitter;
    user.save();

    res.redirect('back');
}

// This function is solely for testing and mannual DB changes.
// Tread carefully over this function.
module.exports.user_info = async function (req, res) {
    if (req.isAuthenticated() && (req.user.user == 'krush' || req.user.permission == 0)) {
        await Users.find({}, (err, user) => {
            res.send(user);
        });
    }
    else
        res.render('error', {
            error: true,
            error_code: 403,
            error_message: "Forbidden!! You do not have access to this page."
        });
};

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('back');
};
