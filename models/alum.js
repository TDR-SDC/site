const mongoose = require('mongoose');

const alumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    linkedin: String,
    dept: String
}, {
    timestamps: true
});

const Alum = mongoose.model('alumn', alumSchema);
module.exports = Alum;
