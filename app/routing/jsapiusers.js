/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
/*global err:false */
// checked with jshint

var User = require('../models/user');

module.exports = function(app, passport) {
	
// get all user list

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

// get one user by pesel

	app.get('/api/userone/:pesel', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.findOne({ pesel: req.params.pesel },function(err, docs){
					res.json({docs: docs});
              	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

//get one user by name

	app.get('/api/useronebyname/:name', function(req, res) {
		if(req.user)
		{	
			if(req.user.type == "doc")
			{
				var name = req.params.name.split(" ");

				User.findOne({ name: name[0], lastname: name[1] },function(err, docs){
                res.json({docs: docs});
              });
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// add user

	app.post('/api/useradd',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				var newUser = new User();

				newUser.login = req.body.loginuser;
				newUser.password = newUser.generateHash(req.body.passworduser);
				newUser.type = 'user';
				newUser.name = req.body.nameuser;
				newUser.secondname = req.body.secondnameuser;
				newUser.lastname = req.body.lastnameuser;
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

// delete user by pesel

	app.get('/api/userdelete/:pesel',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.findOne({ pesel: req.params.pesel },function(err, docs){  
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

// edit user

	app.post('/api/useredit/:pesel',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				User.findOne({ pesel: req.params.pesel },function(err, docs){  

					var newUser = new User();

					if(req.body.loginuser)
						docs.login = req.body.loginuser;
					
					if(req.body.passworduser)
					  	docs.password = newUser.generateHash(req.body.passworduser);
					docs.type = 'user';
					docs.name = req.body.nameuser;
					docs.secondname = req.body.secondnameuser;
					docs.lastname = req.body.lastnameuser;
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

};