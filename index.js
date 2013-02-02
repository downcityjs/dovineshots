var express = require('express');

var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use('/', express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true})); 
});

app.listen(8000, function() {
  console.log('dovineshots listening on port 8000');
});
