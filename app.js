/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var AuthorTasks = require('./routes/authortasks');
var authorTasks = new AuthorTasks("mongodb://teachforindia:teach1234@ds041248.mongolab.com:41248/authors");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
app.get('/', routes.index);
app.get('/users', user.list);
*/
app.get('/', authorTasks.showAll.bind(authorTasks));
app.post('/addtask', authorTasks.addTask.bind(authorTasks));
app.get('/view',authorTasks.view.bind(authorTasks));
app.get('/about',authorTasks.about.bind(authorTasks));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
