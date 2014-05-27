var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); 

var User = require('../App/app/models/user');

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

//User admin
var newUser = new User();

newUser.login = 'admin';
newUser.password = newUser.generateHash('test');
newUser.type = 'admin';

newUser.save(function(err) {
	if (err)
		throw err;
});

//User normal 1
var newUser = new User();

newUser.login = 'user';
newUser.password = newUser.generateHash('test');
newUser.type = 'user';

newUser.save(function(err) {
	if (err)
		throw err;
});

//User normal 2
var newUser = new User();

newUser.login = 'local';
newUser.password = newUser.generateHash('test');
newUser.type = 'user';

newUser.save(function(err) {
	if (err)
		throw err;
});

console.log("Added db sample data.");