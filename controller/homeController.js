const Users = require('../models/users');
const Contact = require('../models/contact_us');
const Photos = require('../models/photo');

module.exports.home = function (req, res) {
    return res.status(200).render('home');
};

module.exports.team = function (req, res) {
    Users.find().sort({ permission: 1 }).then((user) => {
        res.status(200).render('team', {
            users: user
        })
    });
};

module.exports.gallery = function (req, res) {
    Photos.find({}, function (err, photos) {
        res.status(200).render('gallery', {
            photos: photos
        })
    });
};

module.exports.contact = function (req, res) {
    return res.status(200).render('contact');
};

module.exports.contact_form = function (req, res) {
    const contact = new Contact();
    contact.name = req.body.name;
    contact.email = req.body.name;
    contact.subject = req.body.subject;
    contact.message = req.body.message;
    contact.save().then(promiseResult => {
        if (promiseResult !== contact)
            res.status(502).render('error', {
                error: true,
                error_code: 502,
                error_message: "Bad Gateway!! Unable to submit contact request to server."
            })
        else
            res.status(302).redirect('back');
    });
};

module.exports.not_found = function (req, res) {
    return res.status(404).render('error');
}
