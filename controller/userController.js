const Users = require('../models/users');

module.exports.profile = function (req, res) {
    if (req.isAuthenticated())
    Users.findById(req.user._id, function (err, user) {
        return res.render('profile', {
            profile_user: user
        });
    });
    else res.redirect('/login');
};
