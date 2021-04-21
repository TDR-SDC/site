module.exports.home = function (req, res) {
    res.render('home');
};

module.exports.team = function (req, res) {
    res.render('team');
};

module.exports.sponsors = function (req, res) {
    res.render('sponsors');
};

module.exports.gallery = function (req, res) {
    res.render('gallery');
};

module.exports.contact = function (req, res) {
    res.render('contact');
};

module.exports.not_found = function (req, res) {
    res.render('error_404');
}
