const Users = require('../models/users');
const Alum = require('../models/alum');
const Contact = require('../models/contact_us');
const Photos = require('../models/photo');
const Newsletter = require('../models/newsletter');

module.exports.home = function (req, res) {
    Newsletter.find().sort({ date: -1 }).then((newsletters) => {
        let monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return res.status(200).render('home', {
            newsletters: newsletters,
            monthNames: monthNames
        });
    })
};

module.exports.team = function (req, res) {
    Users.find().sort({ permission: 1, name: 1 }).then((user) => {
        Alum.find().sort({ name: 1 }).then((alumni) => {
            res.status(200).render('team', {
                users: user,
                alumni: alumni
            });
        });
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
