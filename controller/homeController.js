const Users = require('../models/users');

module.exports.home = function (req, res) {
    if (req.isAuthenticated()) {
        Users.findById(req.user._id, function (err, user) {
            return res.render('home', {
                profile_user: user
            });
        });
    }
    else return res.render('home');
};

module.exports.team = function (req, res) {
    if (req.isAuthenticated()) {
        Users.findById(req.user._id, function (err, user) {
            return res.render('team', {
                profile_user: user
            });
        });
    }
    else return res.render('team');
};

module.exports.sponsors = function (req, res) {
    if (req.isAuthenticated()) {
        Users.findById(req.user._id, function (err, user) {
            return res.render('sponsors', {
                profile_user: user
            });
        });
    }
    else return res.render('sponsors');
};

module.exports.gallery = function (req, res) {
    if (req.isAuthenticated()) {
        Users.findById(req.user._id, function (err, user) {
            return res.render('gallery', {
                profile_user: user
            });
        });
    }
    else return res.render('gallery');
};

module.exports.contact = function (req, res) {
    if (req.isAuthenticated()) {
        Users.findById(req.user._id, function (err, user) {
            return res.render('contact', {
                profile_user: user
            });
        });
    }
    else return res.render('contact');
};

module.exports.not_found = function (req, res) {
    if (req.isAuthenticated()) {
        Users.findById(req.user._id, function (err, user) {
            return res.render('error_404', {
                profile_user: user
            });
        });
    }
    else return res.render('error_404');
}
