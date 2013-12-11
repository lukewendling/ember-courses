var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var CHAPTERS = require('./chapters.json');

var currentToken = 'ABCDEFGHIJKLMNOP';

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

  console.log('authenticatedRequest: ' + 
    'req.body.token: ' + req.body.token + ', ' + 
    "req.param('token'): " + req.param('token') + ', ' +
    'req.headers.token: ' + req.headers.token 
    );

  //return true; // TODO: rm when ready

  var userToken = req.body.token || req.param('token') || req.headers.token;

  console.log('authenticatedRequest: ' + 
    'userToken: ' + userToken + ', ' + 
    'userToken != currentToken: ' + (userToken != currentToken) 
    );
  if (!currentToken || userToken != currentToken) {
    res.send(401, { error: 'Invalid or missing token. You provided: ' + userToken });
    return false;
  }

  return true;
}

app.get('/chapters', function(req, res) {
  console.log("in app.get('/chapters' ");
  if (authenticatedRequest(req, res)) {
    res.send(CHAPTERS);
  }
});

app.get('/chapters/:id', function(req, res) {
  // TODO: use :id param
  console.log("in app.get('/chapters/:id' ");
  if (authenticatedRequest(req, res)) {
    res.send(CHAPTERS[0]);
  }
});

app.post('/login', function(req, res) {
  console.log('req.params ' + req.params);
  console.log('req.body ' + req.body);
  console.log('req.body.username ' + req.body.username);
  console.log('req.body.password ' + req.body.password);
  //console.log(res);
  if ((req.body.username === 'bob') && (req.body.password === 'pass')) {
    res.status(200);
    res.send({ authToken: currentToken});
  } else {
    res.status(401);
    res.send({ errorMessage: 'Authentication Failed'});
  }
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Node server listening on port ' + app.get('port'));
});
