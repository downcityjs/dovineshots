var request = require('request');
var vine = module.exports = {};
var async = require('async');

var cachedVines = null;
setInterval(function() {
  cachedVines = null;
}, 30*1000);

vine.get = function(callback) {
  if (cachedVines) return callback(null, cachedVines);
  request('http://search.twitter.com/search.json?q=dovineshots OR vineshots&include_entities=true', 
    function(err, response, body) {
      if (err) return callback(err);
      if (response.statusCode !== 200) {
        return callback(new Error('Bad twitter response'));
      }
      var dedupedUrls = {};
      var results = JSON.parse(body);
      async.forEach(results.results, function(item, cb) {
        var urls = item.entities.urls;
        if (!urls) return cb();
        var eurls = findVineUrls(urls).map(function(e) {
          return e.expanded_url;
        });
        eurls.forEach(function(url) {
          dedupedUrls[url] = true;
        });
        cb();
      }, function(err) {
        if (err) return callback(err);
        getTheVines(Object.keys(dedupedUrls), function(err, vines) {
          if (err) return callback(err);
          cachedVines = vines;
          callback(null, vines);
        });
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
    return /vine\.co/.test(u.expanded_url);
  });
}

