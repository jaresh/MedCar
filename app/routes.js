module.exports = function(app, passport) {

//== Main pages 

	app.get('/', function(req, res) {
		console.log(req.user);
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
				res.render('docpanel', { user: req.user });
		}
		else
			res.redirect("/");
	});

	app.get('/adminpanel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
				res.render('adminpanel', { user: req.user });
		}
		else
			res.redirect("/");
	});

	app.get('/patientpanel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "user")
			res.render('patientpanel', { user: req.user });
		}
		else
			res.redirect("/");
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

//== Login

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

//== Other pages

	app.get('*', function(req, res){
		if(req.user)
			res.redirect('/');
		else
			res.render('login.ejs', { message: req.flash('loginMessage') });
	});

};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
