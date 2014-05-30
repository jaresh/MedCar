var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

var User = require('../App/app/models/user');
var Admin = require('../App/app/models/admin');
var Doc = require('../App/app/models/doc');

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
newUser.dateofbirth = new Date(1992, 1, 21);

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
newUser.dateofbirth = new Date(1985, 1, 22);

newUser.save(function(err) {
	if (err)
		throw err;
});

//Doc 1
var newDoc = new Doc();

newDoc.login = 'doc';
newDoc.password = newDoc.generateHash('test');
newDoc.type = 'doc';
newDoc.specialty = 'Urolog';

newDoc.save(function(err) {
	if (err)
		throw err;
});

User.find(function(err, user) 
{
    if (err)
        return done(err);
    if (user) 
    {
        user.forEach(function(entry) {
    		console.log(entry);
		});
    } 
});

console.log("Added db sample data.");