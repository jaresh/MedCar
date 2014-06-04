/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
/*global err:false */
// checked with jshint

var Doc = require('./../models/doc');

module.exports = function(app, passport) {

// get all doctors

	app.get('/api/doclist', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin" || req.user.type == "user")
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

// get one doc by name and lastname

	app.get('/api/docone/:name/:lastname', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin" || req.user.type == "user")
			{
				Doc.findOne({ name: req.params.name, lastname: req.params.lastname },function(err, docs){
                	res.json({docs: docs});
              	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// add doc

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
						console.log(err);
				});

				res.redirect("/adminpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

//delete doc
	app.get('/api/docdelete/:name/:lastname',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{

				Doc.findOne({ name: req.params.name, lastname:  req.params.lastname},function(err, docs){  
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

// edit doc

	app.post('/api/docedit/:name/:lastname',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				Doc.findOne({ name: req.params.name, lastname: req.params.lastname },function(err, docs){  

					var newDoc = new Doc();

					if(req.body.login)
						docs.login = req.body.login;

					if(req.body.password)
					  docs.password = newDoc.generateHash(req.body.password);

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
							console.log(err);
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