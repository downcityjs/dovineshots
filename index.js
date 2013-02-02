var express = require('express');
var vine = require('./lib/vine');

var app = express.createServer();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use('/', express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true})); 
});

app.get('/vines', function(req, res) {
  vine.get(function(err, data) {
    if (err) return res.end(404, err);
    res.end(JSON.stringify(data));
  });
});

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('dovineshots listening on port ' + port);
});
