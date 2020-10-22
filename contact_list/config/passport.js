const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/Users');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true
}, async (email, password, done) => {

    
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, {message: 'Unauthorized'})
    } else {
        
        const match = await user.matchPassword(password);
        delete user.password;
        if (match) {
            return done(null, user)
        } else {
            return done(null, false, {message: 'Usuario o Password incorrectos'})
        }
    }

}))

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser((id, done) => {
    User.findById({_id: id}, (err, user) => {
        done(err, user);
    })
});
