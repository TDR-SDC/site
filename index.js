const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, '/assets')));

app.use('/', require('./routes'));

app.listen(port, err => {
    if (err) {
        console.log(`Error found on port ${port}: \n ${err}`);
        return;
    }
    console.log('Server up and running on port:', port);
});