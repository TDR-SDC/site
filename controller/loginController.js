module.exports.login = function (req, res) {
    if(req.isAuthenticated())
        res.status(401).redirect('/user/profile');
    else res.status(200).render('login');
};
