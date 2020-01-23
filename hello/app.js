
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
//var routes = require('./routes');
//var user = require('./routes/user');
var path = require('path');
var handlebars = require('express3-handlebars');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var hello = require('./routes/hello');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
//app.set('view engine', 'pug')
app.use(favicon(path.join(__dirname, '/node_modules/st/favicon.ico')));
//app.use(express.favicon());
app.use(logger('dev'));
//app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
//app.use(express.methodOverride());
//app.use(multer());
app.use(cookieParser('Intro HCI secret key'));
app.use(session());
//app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
//  app.use(express.errorHandler());
  app.use(errorHandler());
}

// Add routes here
app.get('/', hello.view);

app.get('/hello/:userName', hello.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
