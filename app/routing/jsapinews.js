/*jshint smarttabs:true */
/*global require:false */
/*global module:false */
/*global err:false */
// checked with jshint

var News = require('../models/news');

module.exports = function(app, passport) {
	
// get all news

	app.get('/api/newsall', function(req, res) {
		if(req.user)
		{
			News.find().sort({number: -1}).find(function(err, docs){
              	res.json({docs: docs});
            });
		}
		else
			res.redirect("/");
	});

// get one news by number

	app.get('/api/newsone/:number', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				News.findOne({ number: req.params.number },function(err, docs){
					res.json({docs: docs});
              	});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// get news max number

	app.get('/api/newsnumber', function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
					News.findOne().sort('-number').exec(function (err, news) {
						if(news)
						{
							res.json({number: news.number + 1});
						}
						else
						{
							res.json({number: 1});
						}

  					});
			}
				
			else
			res.redirect("/");
		}
		else
			res.redirect("/");
	});

// add new news 

	app.post('/api/newsadd',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				var newNews = new News();

				var today = new Date();
    			var dd = today.getDate();
    			var mm = today.getMonth()+1;
    			var yyyy = today.getFullYear();

    			if(dd<10) {
        			dd='0'+dd
    			} 

    			if(mm<10) {
        			mm='0'+mm
    			} 

    			today = yyyy + '-' + mm + '-' + dd;

				newNews.title = req.body.title;
				newNews.content = req.body.newscontent;
				newNews.number = req.body.number;
				newNews.date = today;

				newNews.save(function(err) {
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

// delete news

	app.get('/api/newsdelete/:number',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				News.findOne({ number: req.params.number },function(err, docs){  
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

// edit news	

	app.post('/api/newsedit/:number',function(req, res) {
		if(req.user)
		{
			if(req.user.type == "admin")
			{
				News.findOne({ number: req.params.number },function(err, docs){

					var today = new Date();
	    			var dd = today.getDate();
	    			var mm = today.getMonth()+1;
	    			var yyyy = today.getFullYear();

	    			if(dd<10) {
	        			dd='0'+dd
	    			} 

	    			if(mm<10) {
	        			mm='0'+mm
	    			} 

	    			today = yyyy + '-' + mm + '-' + dd;

					docs.title = req.body.title;
					docs.content = req.body.newscontent;
					docs.date = today;
          
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