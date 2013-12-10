var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

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

var COURSES = [
  {
    id: 1,
    subject: 'A',
    code: '1',
    title: 'aa',
    description: '',
    course_items: [
      {
        id: 1,
        localRefId: 'a',
        type: 'aa',
        title: 'aaa',
        groupName: 'aaa'
      },
      {
        id: 2,
        localRefId: 'b',
        type: 'bb',
        title: 'bbb',
        groupName: 'bbb'
      }
    ]
  },
  {
    id: 2,
    subject: 'B',
    code: '2',
    title: 'bb',
    description: '',
    course_items: [
      {
        id: 3,
        localRefId: 'c',
        type: 'cc',
        title: 'ccc',
        groupName: 'ccc'
      },
    ]
  },
];

app.get('/courses', function(req, res) {
  if (authenticatedRequest(req, res)) {
    res.send(COURSES);
  }
});

app.get('/courses/:id', function(req, res) {
  // TODO: use :id param
  if (authenticatedRequest(req, res)) {
    res.send(COURSES[0]);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Node server listening on port ' + app.get('port'));
});
