const Users = require('../models/users');

module.exports.home = function (req, res) {
    return res.render('home');
};

module.exports.team = function (req, res) {
    Users.find().sort({permission:1}).then((user) => {
        res.render('team',{
            users: user
        })
    });
};

module.exports.gallery = function (req, res) {
    return res.render('gallery');
};

module.exports.contact = function (req, res) {
    return res.render('contact');
};

module.exports.not_found = function (req, res) {
    return res.render('error');
}
