var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql/index.js');
var keys = require('../config.js');
var morgan = require('morgan');
var knex = require('knex')
var coll = require('../database-mysql/collections/users.js')

var app = express();
var port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/test', (req, res) => {
  res.send('hello world');
})

app.listen(port, function() {
  console.log('listening on port,', port);
});

app.post('/usersDB', (req, res) => {
  coll.create({
   
  })
  .then((result) => {
    res.json({ success: true, message: 'ok' });     // respond back to request
  })
  .catch((error) => console.log(error))
})

app.post('/eventsDB', (req, res) => {
    console.log('insert functino invoked in server')

  coll.create({
     
  })
  .then((result) => {
    res.json({ success: true, message: 'ok' });     // respond back to request
  })
  .catch((error) => console.log(error))
})

//THIS WILL BE USED in the ASYNC DB CALLS TO SEND THE 
//URL AFTER EACH USER IS SAVED AND THE EVENT IS CREATED
// const client = require('twilio')(keys.accountSid, keys.authToken);
// client.messages
//   .create({
//     to: '+1',
//     from: `${keys.twilioNumber}`,
//     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//   })
//   .then((message) => console.log(message.sid));
