const mongoose = require('mongoose');

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
    dept: String,
    position: String,
    management: Boolean,
    year: Number,
    name: String,
    permission: {
        type: Number,
        default: 10
        // Permission Level 10: 
        //      - view profile
    }
}, {
    timestamps: true
});

const Users = mongoose.model('member_list', userSchema);
module.exports = Users;
