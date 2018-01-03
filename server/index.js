var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();
var port = process.env.PORT || 3000;
// UNCOMMENT FOR REACT
// app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));


app.get('/test', (req, res) => {
  res.send('hello world');
})

app.listen(port, function() {
  console.log('listening on port,', port);
});

