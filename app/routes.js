var Visit = require('./models/visit');
var Doc = require('./models/doc');
var User = require('./models/user');

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
				JSON API
========================================
*/	

 	app.get('/api/docvisits/:name/:lastname', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "doc")
			{
				Visit.find({doc: req.params.name + " " + req.params.lastname}, function(err, visits){
           		res.json({visits: visits});
            	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/api/doclist', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				Doc.find(function(err, docs){
           		res.json({docs: docs});
            	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/api/userslist', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.find(function(err, docs){
           		res.json({docs: docs});
            	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/api/userone/:pesel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.findOne({ pesel: req.params.pesel },function(err,docs){
           			res.json({docs: docs});
            	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/api/docone/:name/:lastname', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				Doc.findOne({ name: req.params.name, lastname: req.params.lastname },function(err,docs){
           			res.json({docs: docs});
            	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.post('/api/docadd',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				var newDoc = new Doc();

				newDoc.login = req.body.login;
				newDoc.password = newDoc.generateHash(req.body.password);
				newDoc.type = 'doc';
				newDoc.name = req.body.name;
				newDoc.lastname = req.body.lastname;
				if(req.body.pon)
					newDoc.workingdays.pon = true;
				else
					newDoc.workingdays.pon = false;
				if(req.body.wt)
					newDoc.workingdays.wt = true;
				else
					newDoc.workingdays.wt = false;
				if(req.body.sr)
					newDoc.workingdays.sr = true;
				else
					newDoc.workingdays.sr = false;
				if(req.body.czw)
					newDoc.workingdays.czw = true;
				else
					newDoc.workingdays.czw = false;
				if(req.body.pi)
					newDoc.workingdays.pi = true;
				else
					newDoc.workingdays.pi = false;
				if(req.body.so)
					newDoc.workingdays.so = true;
				else
					newDoc.workingdays.so = false;
				if(req.body.ni)
					newDoc.workingdays.ni = true;
				else
					newDoc.workingdays.ni = false;

				if(req.body.pon)
				{
					newDoc.workinghours.ponbegin = req.body.ponbegin;
					newDoc.workinghours.ponend = req.body.ponend;
				}
				if(req.body.wt)
				{
					newDoc.workinghours.wtbegin = req.body.wtbegin;
					newDoc.workinghours.wtend = req.body.wtend;
				}
				if(req.body.sr)
				{
					newDoc.workinghours.srbegin = req.body.srbegin;
					newDoc.workinghours.srend = req.body.srend;
				}
				if(req.body.czw)
				{
					newDoc.workinghours.czwbegin = req.body.czwbegin;
					newDoc.workinghours.czwend = req.body.czwend;
				}
				if(req.body.pi)
				{
					newDoc.workinghours.pibegin = req.body.pibegin;
					newDoc.workinghours.piend = req.body.piend;
				}
				if(req.body.so)
				{
					newDoc.workinghours.sobegin = req.body.sobegin;
					newDoc.workinghours.soend = req.body.soend;
				}
				if(req.body.ni)
				{
					newDoc.workinghours.nibegin = req.body.nibegin;
					newDoc.workinghours.niend = req.body.niend;
				}

				newDoc.save(function(err) {
					if (err)
						throw err;
				});

				res.redirect("/adminpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.post('/api/useradd',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				var newUser = new User();

				newUser.login = req.body.login;
				newUser.password = newUser.generateHash(req.body.password);
				newUser.type = 'user';
				newUser.name = req.body.name;
				newUser.secondname = req.body.secondname;
				newUser.lastname = req.body.lastname;
				newUser.pesel = req.body.pesel;
				newUser.dateofbirth = req.body.dateofbirth;

				newUser.save(function(err) {
					if (err)
						throw err;
				});

				res.redirect("/adminpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});


	app.get('/api/userdelete/:pesel',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.findOne({ pesel: req.params.pesel },function(err,docs){  
    				docs.remove(); 
				});  

				res.redirect("/adminpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/api/docdelete/:name/:lastname',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{

				Doc.findOne({ name: req.params.name, lastname:  req.params.lastname},function(err,docs){  
    				docs.remove(); 
				});  

				res.redirect("/adminpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.get('/api/docedit/:name/:lastname',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				Doc.findOne({ name: req.params.name, lastname: req.params.lastname },function(err,docs){  

					docs.login = req.body.login;
					docs.type = 'doc';
					docs.name = req.body.name;
					docs.lastname = req.body.lastname;
					if(req.body.pon)
						docs.workingdays.pon = true;
					else
						docs.workingdays.pon = false;
					if(req.body.wt)
						docs.workingdays.wt = true;
					else
						docs.workingdays.wt = false;
					if(req.body.sr)
						docs.workingdays.sr = true;
					else
						docs.workingdays.sr = false;
					if(req.body.czw)
						docs.workingdays.czw = true;
					else
						docs.workingdays.czw = false;
					if(req.body.pi)
						docs.workingdays.pi = true;
					else
						docs.workingdays.pi = false;
					if(req.body.so)
						docs.workingdays.so = true;
					else
						docs.workingdays.so = false;
					if(req.body.ni)
						docs.workingdays.ni = true;
					else
						docs.workingdays.ni = false;

					if(req.body.pon)
					{
						docs.workinghours.ponbegin = req.body.ponbegin;
						docs.workinghours.ponend = req.body.ponend;
					}
					if(req.body.wt)
					{
						docs.workinghours.wtbegin = req.body.wtbegin;
						docs.workinghours.wtend = req.body.wtend;
					}
					if(req.body.sr)
					{
						docs.workinghours.srbegin = req.body.srbegin;
						docs.workinghours.srend = req.body.srend;
					}
					if(req.body.czw)
					{
						docs.workinghours.czwbegin = req.body.czwbegin;
						docs.workinghours.czwend = req.body.czwend;
					}
					if(req.body.pi)
					{
						docs.workinghours.pibegin = req.body.pibegin;
						docs.workinghours.piend = req.body.piend;
					}
					if(req.body.so)
					{
						docs.workinghours.sobegin = req.body.sobegin;
						docs.workinghours.soend = req.body.soend;
					}
					if(req.body.ni)
					{
						docs.workinghours.nibegin = req.body.nibegin;
						docs.workinghours.niend = req.body.niend;
					}

					docs.save(function(err) {
						if (err)
							throw err;
					});

				});  

				res.redirect("/adminpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

	app.post('/api/useredit/:pesel',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.findOne({ pesel: req.params.pesel },function(err,docs){  

    				docs.login = req.body.login;
					docs.type = 'user';
					docs.name = req.body.name;
					docs.secondname = req.body.secondname;
					docs.lastname = req.body.lastname;
					docs.pesel = req.body.pesel;
					docs.dateofbirth = req.body.dateofbirth;

  					docs.save(function(err) {
					if (err)
						throw err;
					});
				});  

				res.redirect("/adminpanel");
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
