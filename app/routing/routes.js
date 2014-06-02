/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
/*global err:false */
// checked with jshint

var Doc = require('../models/doc');
var User = require('../models/user');
var Admin = require('../models/admin');

module.exports = function(app, passport) {

/*
========================================
				MAIN PAGES
========================================
*/

	app.get('/', function(req, res) {
		if(req.user)
			res.render('index', { user: req.user });
    else 
      res.redirect('/login');

	});

	app.get('/profile', function(req, res) {
		if(req.user)
			res.render('profile', { user: req.user });
		else
			res.redirect("/login");
	});

	app.get('/docpanel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "doc")
			{
				res.render('docpanel', { user: req.user });
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/adminpanel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
				res.render('adminpanel', { user: req.user });
			
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/patientpanel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "user")
			res.render('patientpanel', { user: req.user });

			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

/*
========================================
				LOGIN
========================================
*/

	app.get('/login', function(req, res) {
		if(req.user)
			res.redirect('/');
		else
			res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/',
		failureRedirect : '/login', 
		failureFlash : true 
	}));
	
	app.post('/loginadmin', passport.authenticate('admin-login', {
		successRedirect : '/',
		failureRedirect : '/login', 
		failureFlash : true 
	}));

	app.post('/logindoc', passport.authenticate('doc-login', {
		successRedirect : '/',
		failureRedirect : '/login', 
		failureFlash : true 
	}));

/*
========================================
	JSON API FIND LOGINS IN FORMS
========================================
*/	

	app.get('/api/findlogin/:login', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{

				User.findOne({ login: req.params.login },function(err, docs){
                if(docs){
                  res.json({findlogin: true});
                }
                else
                {
                  Admin.findOne({ login: req.params.login },function(err, docs){

                    if(docs){
                      res.json({findlogin: true});
                    }
                    else{

						Doc.findOne({ login: req.params.login },function(err, docs){

                        if(docs){
                          res.json({findlogin: true});
                        }
                        else
                        {
                          res.json({findlogin: false});
                        }
                      });
                    }
                  });
                }
              });
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

/*
========================================
				OTHER PAGES
========================================
*/

	app.get('*', function(req, res){
		if(req.user)
			res.redirect('/');
		else
			res.render('login.ejs', { message: req.flash('loginMessage') });
	});

};