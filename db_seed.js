/*global require:false */
// checked with jshint
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

var User = require('./app/models/user');
var Admin = require('./app/models/admin');
var Doc = require('./app/models/doc');
var Visit = require('./app/models/visit');

//User admin
var newAdmin = new Admin();

newAdmin.login = 'admin';
newAdmin.password = newAdmin.generateHash('test');
newAdmin.type = 'admin';

newAdmin.save(function(err) {
	if (err)
		throw err;
});

//User normal 1
var newUser = new User();

newUser.login = 'user';
newUser.password = newUser.generateHash('test');
newUser.type = 'user';
newUser.name = 'Jacek';
newUser.secondname = '-';
newUser.lastname = 'Sikora';
newUser.pesel = '92022111457';
newUser.dateofbirth = '1992-02-21';

newUser.save(function(err) {
	if (err)
		throw err;
});

//User normal 2
var newUser = new User();

newUser.login = 'local';
newUser.password = newUser.generateHash('test');
newUser.type = 'user';
newUser.name = 'Mateusz';
newUser.secondname = 'Wacław';
newUser.lastname = 'Kowal';
newUser.pesel = '85022235847';
newUser.dateofbirth = '1985-02-22';

newUser.save(function(err) {
	if (err)
		throw err;
});

//Doc 1
var newDoc = new Doc();

newDoc.login = 'doc';
newDoc.password = newDoc.generateHash('test');
newDoc.type = 'doc';
newDoc.name = 'Jan';
newDoc.lastname = 'Potocki';
newDoc.workingdays.pon = true;
newDoc.workingdays.wt = true;
newDoc.workingdays.sr = true;
newDoc.workingdays.czw = true;
newDoc.workingdays.pi = true;
newDoc.workingdays.so = false;
newDoc.workingdays.ni = false;
newDoc.workinghours.ponbegin = 8;
newDoc.workinghours.ponend = 14;
newDoc.workinghours.wtbegin = 8;
newDoc.workinghours.wtend = 16;
newDoc.workinghours.srbegin = 15;
newDoc.workinghours.srend = 20;
newDoc.workinghours.czwbegin = 10;
newDoc.workinghours.czwend = 16;
newDoc.workinghours.pibegin = 12;
newDoc.workinghours.piend = 18;

newDoc.save(function(err) {
	if (err)
		throw err;
});

//Doc 2
var newDoc = new Doc();

newDoc.login = 'doc2';
newDoc.password = newDoc.generateHash('test');
newDoc.type = 'doc';
newDoc.name = 'Joanna';
newDoc.lastname = 'Nowak';
newDoc.workingdays.pon = true;
newDoc.workingdays.wt = true;
newDoc.workingdays.sr = true;
newDoc.workingdays.czw = false;
newDoc.workingdays.pi = false;
newDoc.workingdays.so = false;
newDoc.workingdays.ni = false;
newDoc.workinghours.ponbegin = 8;
newDoc.workinghours.ponend = 14;
newDoc.workinghours.wtbegin = 8;
newDoc.workinghours.wtend = 16;
newDoc.workinghours.srbegin = 15;
newDoc.workinghours.srend = 20;

newDoc.save(function(err) {
	if (err)
		throw err;
});

//visit

var newVisit = new Visit();

newVisit.doc = "Joanna Nowak";
newVisit.patient = "Jacek Sikora";
newVisit.hour = "16:20";
newVisit.day = "2014-03-22";

newVisit.save(function(err) {
	if (err)
		throw err;
});

Doc.find(function (err, doc){
	console.log(doc);
});

Visit.find({patient: "Jacek Sikora"}, function (err, doc){
	console.log(doc);
});

console.log("Added db sample data.");