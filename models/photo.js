const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PHOTO_PATH = path.join('/assets/imgs/');

const photoSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
    },
    descript: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', PHOTO_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

photoSchema.statics.uploadedPhoto = multer ({storage: storage}).single('photo');

const Photos = mongoose.model('photo', photoSchema);
module.exports = Photos;
