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
        // Permission Level 9: 1st year members
        //      - view profile
        // Permission Level 8:  2nd year members
        //      - view profile
        // Permission Level 7:  3rd Years
        //      - 
        // Permission Level 3:  Department Leads
        //      - 
        // Permission Level 2:  Team Managers
        //      - 
        // Permission Level 1:  Team Lead
        //      - 
        // Permission Level 0:  Admin
        //      - All access

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
    avatar: String
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
    }
});

userSchema.statics.uploadedAvatar = multer ({storage: storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const Users = mongoose.model('member_list', userSchema);
module.exports = Users;
