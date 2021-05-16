const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const bcrypt = require('bcrypt');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ user: username }, async function (err, user) {
            // Passport configuration error
            if (err) {
                return done(err);
            }

            //Check if password's hash matches database
            let hashCheckResult = false;
            await bcrypt.compare(user.password, password).then(function (result) {
                hashCheckResult = result;
            });

            // Check is user dosent exist of hash dosen't match to DB
            if (!user || hashCheckResult) {
                return done(null, false);
            }

            // Authentication success
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            // console.log('Error in finding user --> Passport');
            return done(err);
        }
        done(err, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    let auth_status = req.isAuthenticated() ? "sucess" : "failure";
    // console.log(`Authentication ${auth_status}`);
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.status(401).redirect('/login');
}

passport.setAuthenticatedUser = async function (req, res, next) {
    if (await req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
