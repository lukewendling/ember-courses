var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var CHAPTERS = require('./chapters.json');

app.set('port', process.env.PORT || 4000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function authenticatedRequest(req, res) {

  return true; // TODO: rm when ready

  var userToken = req.body.token || req.param('token') || req.headers.token;

  if (!currentToken || userToken != currentToken) {
    res.send(403, { error: 'Invalid token. You provided: ' + userToken });
    return false;
  }

  return true;
}

app.get('/chapters', function(req, res) {
  if (authenticatedRequest(req, res)) {
    res.send(CHAPTERS);
  }
});

app.get('/chapters/:id', function(req, res) {
  // TODO: use :id param
  if (authenticatedRequest(req, res)) {
    res.send(CHAPTERS[0]);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Node server listening on port ' + app.get('port'));
});
