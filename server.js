// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
var timestamp = require('unix-timestamp');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:date", function (request, response) {
  var dateInMillis = Date.parse(request.params.date);
  var unixTimestamp = parseInt(request.params.date);
  var json = {
    unix: null,
    natural: null
  };
  
  if(!isNaN(dateInMillis)) {
    json.natural = naturalDate(new Date(dateInMillis));
    json.unix = timestamp.fromDate(new Date(dateInMillis));
  } else if(!isNaN(unixTimestamp)) {
    json.natural = naturalDate(timestamp.toDate(unixTimestamp));
    json.unix = unixTimestamp;
  }
  
  
  response.send(json);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function naturalDate(date) {
   
    var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
    ];
  
    var year = date.getFullYear();
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
  
    return month + ' ' + day + ', ' + year;
}