var express = require('express');

var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use('/', express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true})); 
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('dovineshots listening on port ' + port);
});
