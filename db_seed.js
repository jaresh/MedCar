/*global require:false */
// checked with jshint
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

var User = require('./app/models/user');
var Admin = require('./app/models/admin');
var Doc = require('./app/models/doc');
var Visit = require('./app/models/visit');
var News = require('./app/models/news');

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

var newVisit = new Visit();

newVisit.doc = "Joanna Nowak";
newVisit.patient = "Jacek Sikora";
newVisit.hour = "10:00";
newVisit.day = "2014-06-09";

newVisit.save(function(err) {
	if (err)
		throw err;
});

var newVisit = new Visit();

newVisit.doc = "Jan Potocki";
newVisit.patient = "Jacek Sikora";
newVisit.hour = "13:00";
newVisit.day = "2014-06-09";

newVisit.save(function(err) {
	if (err)
		throw err;
});

var newVisit = new Visit();

newVisit.doc = "Jan Potocki";
newVisit.patient = "Jacek Sikora";
newVisit.hour = "13:00";
newVisit.day = "2014-03-22";

newVisit.save(function(err) {
	if (err)
		throw err;
});

var newNews = new News();

newNews.title = "Witamy w MedCar. Oto tytuł ogłoszenia.";
newNews.content = "<span style='font-family:Cursive;font-size:14px;font-style:normal;font-weight:normal;text-decoration:none;text-transform:none;color:000000;'>Można pisać sam tekst</span>Lub dodawać tagi HTML.";
newNews.number = "1";
newNews.date = "2014-03-22";

newNews.save(function(err) {
	if (err)
		throw err;
});

var newNews = new News();

newNews.title = "Informacje";
newNews.content = "<h2 style='font-family:Cursive; color:red;'>Konta</h2><p>Administrator ma możliwość przeglądania,dodawania,edycji i usuwania pacjentów, lekarzy oraz ogłoszeń.</p>"+
"<p>Nie ma on wpływu na wizyty u lekarza.</p>" + 
"<p>Lekarz może przejrzeć historię wizyt oraz sprawdzić nadchodzące wizyty.</p>"+
"<p>Pacjent może sprawdzić historię wizyt, umówić się na wizytę TYLKO w godzinach i dniach pracy lekarza."+
"Może odmówić wizytę jeżeli jeszcze się nie odbyła.</p>";
newNews.number = "2";
newNews.date = "2014-06-03";

newNews.save(function(err) {
	if (err)
		throw err;
});

console.log("Added db sample data.");