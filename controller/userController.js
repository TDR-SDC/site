module.exports.profile = function (req, res) {
    if(req.isAuthenticated())
        res.send('Hello');
    else res.redirect('/login');
};
