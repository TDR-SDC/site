module.exports.home = function (req, res) {
    res.render('home.ejs');
};

module.exports.team = function (req, res) {
    res.render('team');
};

module.exports.not_found = function (req, res) {
    res.render('error_404');
}
