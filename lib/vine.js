var request = require('request');
var vine = module.exports = {};
var async = require('async');

vine.get = function(callback) {
  request('http://search.twitter.com/search.json?q=dovineshots&include_entities=true', 
    function(err, response, body) {
      if (err) return callback(err);
      if (response.statusCode !== 200) {
        return callback(new Error('Bad twitter response'));
      }
      var data = [];
      var results = JSON.parse(body);
      async.forEach(results.results, function(item, cb) {
        var urls = item.entities.urls;
        if (!urls) return cb();

        var eurls = findVineUrls(urls).map(function(e) {
          return e.expanded_url;
        });
        getTheVines(eurls, function(err, vines) {
          if (err) return cb(err);
          data = data.concat(vines);
          cb();
        });
      }, function(err) {
        if (err) return callback(err);
        callback(null, data);
      });
    }
  );
}

function getTheVines(urls, callback) {
  var vines = [];
  async.forEach(urls, function(url, cb) {
    request(url, function(err, req, body) {
      if (err || req.statusCode !== 200) return cb(new Error('Error retrieving vines'));
      var match = body.match(/<video[\s\S]*video>/);
      if (!match) return cb(null, '');
      vines.push(match[0]);
      cb();
    });
  }, function(err) {
    if (err) return callback(err);
    callback(null, vines);
  });
}

function findVineUrls(urls) {
  return urls.filter(function(u) {
    console.log(u.expanded_url);
    return /vine\.co/.test(u.expanded_url);
  });
}

