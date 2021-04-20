module.exports.home = function (req, res) {
    res.render('home');
};

module.exports.team = function (req, res) {
    res.render('team');
};

module.exports.sponsors = function (req, res) {
    res.render('sponsors');
};

module.exports.not_found = function (req, res) {
    res.render('error_404');
}
