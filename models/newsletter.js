const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const DOC_PATH = path.join('/assets/imgs/');

const newsletterSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    uploadedBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', DOC_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

newsletterSchema.statics.uploadedNewsletter = multer({ storage: storage }).single('newsletter');

const Newsletters = mongoose.model('newsletter', newsletterSchema);
module.exports = Newsletters;
