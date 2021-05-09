const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/assets/imgs/team_members')

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        default: "general"
    },
    position: String,
    management: {
        type: Boolean,
        default: false
    },
    year: {
        type: Number,
        default: 0
    },
    name: String,
    permission: {
        type: Number,
        default: 10
    },
    social: {
        insta: {
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
        },
        twitter: {
            type: String,
            default: ""
        }
    },
    avatar: {
        type: String,
        default: "https://defianzdtusdc.blob.core.windows.net/team-members/placeholder.png"
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

userSchema.statics.uploadedAvatar = multer ({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const Users = mongoose.model('member_list', userSchema);
module.exports = Users;
