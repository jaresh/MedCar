/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
/*global process:false */
// checked with jshint

var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');
var Admin = require('../app/models/admin');
var Doc = require('../app/models/doc');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        if(user.type == "user")
        {
            User.findOne({ 'login' :  user.login }, function(err, user){
            done(err, user);
            });
        }
        else if(user.type == "admin")
        {
            Admin.findOne({ 'login' :  user.login }, function(err, user){
            done(err, user);
            });
        }
        else if(user.type == "doc")
        {
            Doc.findOne({ 'login' :  user.login }, function(err, user){
            done(err, user);
            });
        }

    });

// == Login user==
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
                {
                    console.log("Zalogowano poprawnie");
                    return done(null, user);
                }
            });
        });

    }));

    // == Login admin==
    passport.use('admin-login', new LocalStrategy({

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
            Admin.findOne({ 'login' :  login }, function(err, user) 
            {

                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Błędny login lub hasło.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Błędny login lub hasło.'));

                else
                {
                    console.log("Zalogowano poprawnie");
                    return done(null, user);
                }
            });
        });

    }));

    // == Login doc==
    passport.use('doc-login', new LocalStrategy({

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
            Doc.findOne({ 'login' :  login }, function(err, user) 
            {

                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash('loginMessage', 'Błędny login lub hasło.'));

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Błędny login lub hasło.'));

                else
                {
                    console.log("Zalogowano poprawnie");
                    return done(null, user);
                }
            });
        });

    }));

};