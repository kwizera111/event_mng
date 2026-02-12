const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
const connection = require('./conn');
const bcrypt = require('bcrypt');
function passportConfig() {
passport.use(new LocalStrategy(
  function(email, password, done) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) { return done(err); }
            if (results.length === 0) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        });
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => {
            connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
                if (err) { return done(err); }
                done(null, results[0]);
            });
        });
    }));
}
module.exports = passportConfig;