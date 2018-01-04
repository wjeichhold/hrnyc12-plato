var express = require('express');
var bodyParser = require('body-parser');
var keys = require('../config.js');
var db = require('../database-mysql');

var morgan = require('morgan');
var knex = require('knex')
var coll = require('../database-mysql/collections/users.js')

var app = express();
var port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));


// below is dummy data that represents results from the database as part of the post to /event
var queryResults = { 
  users: [
    {
      id: 123,
      firstName: 'Bruce',
      lastName: 'Wayne',
      phoneNumber: 7202913366,
      latitude: 64.1265,
      longitude: -21.827774,
      event_id: 789,
      lastUpdated: '14:35'
    },
    {
      id: 1234,
      firstName: 'Clark',
      lastName: 'Kent',
      phoneNumber: '7034720919',
      latitude: 64.1265,
      longitude: -21.827774,
      event_id: 789,
      lastUpdated: '14:35'
    },
    {
      id: 12345,
      firstName: 'Natasha',
      lastName: 'Romanov',
      phoneNumber: 9173850061,
      latitude: 64.1265,
      longitude: -21.827774,
      event_id: 789,
      lastUpdated: '14:35'
    }], 
  event: {
    id: 789,
    time: '15:30',
    lat: 30.403920,
    long: 45.98120,
  } 
};


const client = require('twilio')(keys.accountSid, keys.authToken);

// below would actually be put inside the post, but I used the test route to make sure this worked

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
