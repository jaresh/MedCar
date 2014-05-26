//== setup
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var path = require('path');

//== config
mongoose.connect('mongodb://localhost/test'); 

require('./config/passport')(passport); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser()); 
app.use(bodyParser()); 
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(session({ secret: 'jaceknawakacjach' }));
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport); 

app.listen(port);
console.log('The magic happens on port ' + port);