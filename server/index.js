var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var keys = require('../config.js');
var db = require('../database-mysql');
var User = require('../database-mysql/models/user');
var Event = require('../database-mysql/models/event');

var coll = require('../database-mysql/collections/users.js')
var userControllers = require('../database-mysql/controllers/userController.js')
var eventController = require('../database-mysql/controllers/eventController.js')
var Users = require('../database-mysql/collections/users.js')

var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.put('/user', userControllers.put);

const client = require('twilio')(keys.accountSid, keys.authToken);

app.get('/test', (req, res) => {
  queryResults.users.forEach( user => {
    client.messages
      .create({
        to: `+1${user.phoneNumber}`,
        from: `${keys.twilioNumber}`,
        body: `Hey ${user.firstName} ${user.lastName}, you've been invited to my event. Please click on the link below to share your location:
        http://localhost:3000/#/event/${queryResults.event.id}/?userId=${user.id}`,
    })
    .then((message) => console.log('testing', message.sid))
    .catch((err) => {
      console.error('Could not notify administrator');
      console.error(err);
    });
  })
  res.send('hello world');
})

app.get('/event', (req, res) => {
  var eventId = req.param('eventId');
  new Event({'id': eventId})
    .fetch()
    .then(function(eventData){
      User.query(function(qb) {
        qb.where('eventId','=', eventId).andWhere('latitude', '!=', 'NULL')
      })
      .fetchAll()
      .then(function(users) {
        res.send({ users:users, event: eventData })
      });
    });
});


app.listen(port, function() {
  console.log('listening on port,', port);
});