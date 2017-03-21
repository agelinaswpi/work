// setup express to configure a basic web server
 var express = require('express');
 var app = express();
 
 // moment.js is the preferred date library
 var moment = require('moment');
 
 // access Node.js Crypto library for signature generation
 var crypto = require('crypto');
 
 // use request or request-promise to call into STATS API
 var request = require('request');
 
 // respond to all get requests
 app.get('/', function (req, res) {
   // get the current time
   var timeFromEpoch = moment.utc().unix();
 
   // set the API key (this is the actual key)
   var apiKey = '8z6vanzbt4y5xnt3bpgnvd8m';
 
   // set the shared secret key (actual shared secret hash key)
   var secret = 'vWCDKbACXT';
 
   // generate signature
   var sig = crypto.createHash('sha256').update(apiKey + secret + timeFromEpoch).digest('hex');
 
   request('http://api.stats.com/v1/stats/baseball/mlb/teams/226?season=2016&languageId=1&accept=json&api_key=8z6vanzbt4y5xnt3bpgnvd8m&sig=8ba3c845685884dca3c92b612d6ad33837cb176a2bcb700ba8023b8f5b3b778d',
       function (err, response, body) {
         // parse the body as JSON
         //var parsedBody = JSON.parse(body);
         //res.json(parsedBody);
       });
 });
 
 var port = 3001;
 app.listen(port, function () {
   console.log('Listening on port ' + port);
 });
 
 // run this file (node [filename]) and go to http://127.0.0.1:3001