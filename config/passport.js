var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

// == Login ==
    passport.use('local-login', new LocalStrategy({

        usernameField : 'login',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, login, password, done) 
    {
        if (login)
            login = login.toLowerCase(); 

        process.nextTick(function() 
        {
            User.findOne({ 'login' :  login }, function(err, user) 
            {

                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Błędny login lub hasło.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Błędny login lub hasło.'));

                else
                    return done(null, user);
            });
        });

    }));

};