var express  = require('express');
var app      = express();
var port     = process.env.PORT || 300;
var mongoose = require('mongoose');
var passport = require('passport');
var path = require('path');

var routes = require('./app/index')
var app = express();

require('./config/passport')(passport);
require('./app/index.js')(app, passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express['static'](__dirname + '/views'));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/test',function (err, res) {
  if (err) {
  console.log ('ERROR connecting to database');
  } else {
  console.log ('Succeeded connected to database');
  }
});

var db = mongoose.connection;

app.use(function(req,res,next){
    req.db = db;
    next();
});

//app.use('/', routes);

// JSON API

//app.use('/api', api);
//app.get('/api/post/:id', api.post);
//app.post('/api/post', api);
//app.put('/api/post/:id', api.editPost);
//app.delete('/api/post/:id', api);
/*
fs.readdirSync(__dirname + "/models").forEach(function(filename){

    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});*/

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
