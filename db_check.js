var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

var User = require('../App/app/models/user');
var Admin = require('../App/app/models/admin');
var Doc = require('../App/app/models/doc');
var Visit = require('../App/app/models/visit');

Doc.find(function (err, doc){
	console.log(doc);
});

User.find(function (err, doc){
	console.log(doc);
});

Visit.find({patient: "Jacek Sikora"}, function (err, doc){
	console.log(doc);
});
