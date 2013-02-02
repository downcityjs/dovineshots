var express = require('express');

var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use('/public', express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true})); 
});

app.get('/', function(req, res) {
  res.end('Get Hyphy on Vine Bro');
});

app.listen(8000, function() {
  console.log('dovineshots listening on port 8000');
});
