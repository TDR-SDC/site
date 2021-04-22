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

module.exports.create = async function (req, res) {
    await Users.create({
        "user": req.body.user,
        "name": req.body.name,
        "password": req.body.password,
        "dept": req.body.dept,
        "year": req.body.year,
        "position": req.body.position
    });
    res.redirect('/user/profile');
};

module.exports.update_credentials = async function (req, res) {
    var new_details = {};
    new_details.social = req.user.social;
    if (req.body.name)
        new_details.name = req.body.name;
    if (req.body.password)
        new_details.password = req.body.password;
    if (req.body.insta)
        new_details.social.insta = req.body.insta;
    if (req.body.linkedin)
        new_details.social.linkedin = req.body.linkedin;
    if (req.body.twitter)
        new_details.social.twitter = req.body.twitter;

    await Users.findOneAndUpdate({ '_id': req.user._id }, new_details, { upsert: true });
    res.redirect('back');
}

module.exports.user_info = async function (req, res) {

    await Users.find({}, function (err, user) {
        res.send(user);

    })
    console.log(req.user);
};

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('back');
};
