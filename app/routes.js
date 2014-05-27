module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		if(req.user)
		{
			if (req.user.type == 'user') 
        		res.render('index.ejs');

    		else if (req.user.type == 'admin')
         		res.render('admin.ejs');
		}
    	else 
         	res.redirect('/login');

	});

	app.get('/profile', function(req, res) {
		if(req.user)
			res.render('profile', { user: req.user});
		else
			res.redirect("/login");
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
