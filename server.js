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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Node server listening on port ' + app.get('port'));
});
