const Users = require('../models/users');

module.exports.home = function (req, res) {
    Users.findById(req.user._id, function (err, user) {
        return res.render('home', {
            profile_user: user
        });
    });
};

module.exports.team = function (req, res) {
    Users.findById(req.user._id, function (err, user) {
        return res.render('team', {
            profile_user: user
        });
    });
};

module.exports.sponsors = function (req, res) {
    Users.findById(req.user._id, function (err, user) {
        return res.render('sponsors', {
            profile_user: user
        });
    });
};

module.exports.gallery = function (req, res) {
    Users.findById(req.user._id, function (err, user) {
        return res.render('gallery', {
            profile_user: user
        });
    });
};

module.exports.contact = function (req, res) {
    Users.findById(req.user._id, function (err, user) {
        return res.render('contact', {
            profile_user: user
        });
    });
};

module.exports.not_found = function (req, res) {
    Users.findById(req.user._id, function (err, user) {
        return res.render('error_404', {
            profile_user: user
        });
    });
}
