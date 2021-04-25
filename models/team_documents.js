const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/assets/imgs/sponsors');

const documentSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
    },
    location:{
        type: String,
        required: true
    },
    posted_by:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', FILE_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

documentSchema.statics.uploadedFile = multer ({storage: storage}).single('file');

const DOCS = mongoose.model('document_list', documentSchema);
module.exports = DOCS;
