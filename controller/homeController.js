const Users = require('../models/users');

module.exports.home = function (req, res) {
    return res.render('home');
};

module.exports.team = function (req, res) {
    var sortParams = { permission: 1 };
    Users.find().sort('sortParams');
    // console.log(req.user);
    Users.find({}, function (err, user) {
        return res.render('team', {
            users: user
        });
    })
};

module.exports.sponsors = function (req, res) {
    return res.render('sponsors');
};

module.exports.gallery = function (req, res) {
    return res.render('gallery');
};

module.exports.contact = function (req, res) {
    return res.render('contact');
};

module.exports.not_found = function (req, res) {
    return res.render('error_404');
}
