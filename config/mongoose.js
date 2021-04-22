const mongoose = require('mongoose');

const uri = 'mongodb+srv://krush:ZAQxsw@123@defianz-dtusdc.zpv4d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function () {
    // console.log('Connected to Database :: MongoDB');
});

module.exports = db;
