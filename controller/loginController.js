module.exports.login = function (req, res) {
    if(req.isAuthenticated())
        res.redirect('/user/profile');
    else res.render('login');
};
