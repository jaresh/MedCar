/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
/*global err:false */
// checked with jshint

var Visit = require('../models/visit');

module.exports = function(app, passport) {

// get doc visits by name and lastname

	app.get('/api/docvisits/:name/:lastname', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "doc")
			{
				Visit.find().sort({day: -1}).find({doc: req.params.name + " " + req.params.lastname}, function(err, visits){
              		res.json({visits: visits});
				});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// get uservisits by name and lastname

	app.get('/api/uservisits/:name/:lastname', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "user")
			{
				Visit.find().sort({day: -1}).find({patient: req.params.name + " " + req.params.lastname}, function(err, visits){
              		res.json({visits: visits});
              	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// get visits by name and date

	app.get('/api/getvisitbydate/:name/:lastname/:date', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "user")
			{
				Visit.find({doc: req.params.name + " " + req.params.lastname, day: req.params.date}, function(err, visits){
              		res.json({visits: visits});
              	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// visit add

	app.post('/api/visitadd',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "user")
			{
				var newVisit = new Visit();

				newVisit.doc = req.body.name + " " + req.body.lastname;
				newVisit.patient = req.user.name + " " + req.user.lastname;
				newVisit.day = req.body.date;
				newVisit.hour = req.body.visithour;

				newVisit.save(function(err) {
					if (err)
						throw err;
				});

				res.redirect("/userpanel");
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

};