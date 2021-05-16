const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const LOGO_PATH = path.join('/assets/imgs/');

const sponsorSchema = new mongoose.Schema({
    sponsor: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', LOGO_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

sponsorSchema.statics.uploadedLogo = multer ({storage: storage}).single('logo');
sponsorSchema.statics.logoPath = LOGO_PATH;

const Sponsors = mongoose.model('sponsor_list', sponsorSchema);
module.exports = Sponsors;
