module.exports.login = function (req, res) {
    if(req.isAuthenticated())
        res.status(401).redirect(`/user/profile/${req.user.user}`);
    else res.status(200).render('login');
};
