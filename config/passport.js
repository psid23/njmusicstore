const passport = require('passport');

/* PASSPORT LOCAL AUTHENTICATION */
const LocalStrategy = require('passport-local').Strategy;
const UserDetails = require("../models/userInfo");
passport.use(new LocalStrategy(
    function (username, password, done) {
        UserDetails.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }
            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        cb(err, user);
    });
});
module.exports = passport;