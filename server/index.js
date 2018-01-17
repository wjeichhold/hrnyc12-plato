// import { read } from 'fs';

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var keys = require('../config.js')
var db = require('../database-mysql');
var User = require('../database-mysql/models/user');
var Event = require('../database-mysql/models/event');


var coll = require('../database-mysql/collections/users.js')
var controller = require('../database-mysql/controllers/userController');
var Users = require('../database-mysql/collections/users.js')
var axios = require('axios')
var request = require('request');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.put('/user', controller.put);
app.post('/user', (req, res) => controller.post(req, res, twilioText));



app.post('/server/lyft', (req, res) => {
  console.log(req.body)

  var headers = {
    'Content-Type': 'application/json'
};

var dataString = {"grant_type": "client_credentials", "scope": "public"};

var test = axios.create({
    headers: headers,
    auth: {
        username: keys.lyftUser,
        password: keys.lyftPass
    }
})



test.post('https://api.lyft.com/oauth/token', dataString).then((data) => {
  var USER_TOKEN = data.data.access_token
  console.log('TOLKEN', USER_TOKEN)
  var AuthStr = 'Bearer '.concat(USER_TOKEN);
// ?end_lng=-74.0101&start_lng=-73.9764&end_lat=40.7066&start_lat=40.7505
  var lyft = axios.create({
    headers: { Authorization: AuthStr },
    params: {
      start_lat: 40.7505,
      start_lng: -73.9764,
      end_lat: 40.7066,
      end_lng: -74.0101,
    }
  })

  lyft.get('https://api.lyft.com/v1/cost').then((data) => {
    console.log('did we get cool stuff?', data.data)
    res.send(data.data)
  }).catch((err) => {
    console.log(err)
    res.send('no bueno')
  })
}).catch((err) => console.log(err))

})

const client = require('twilio')(keys.twilioAcct, keys.twilioAPI);

// below would actually be put inside the post, but I used the test route to make sure this worked


app.get('/server/test' , (req, res) => {



// var options = {
//     url: 'https://api.lyft.com/oauth/token',
//     method: 'POST',
//     headers: headers,
//     body: dataString,
//     auth: {
//         'user': 'mcGXiF0snpMA',
//         'pass': 'LbAsGZQk91aN3jZ1kpkjI6OyCktx-N0e'
//     }
// };

// function callback(error, response, body) {
//     if (!error) {
//         console.log('did this work', body);
//     }
// }

// request(options, callback);


// var instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
// var dataString = {"grant_type": "client_credentials", "scope": "public"};


var headers = {
    'Content-Type': 'application/json'
};

var dataString = {"grant_type": "client_credentials", "scope": "public"};

var test = axios.create({
    headers: headers,
    auth: {
        username: 'mcGXiF0snpMA',
        password: 'LbAsGZQk91aN3jZ1kpkjI6OyCktx-N0e'
    }
})



test.post('https://api.lyft.com/oauth/token', dataString).then((data) => {
  var USER_TOKEN = data.data.access_token
  console.log('TOLKEN', USER_TOKEN)
  var AuthStr = 'Bearer '.concat(USER_TOKEN);
// ?end_lng=-74.0101&start_lng=-73.9764&end_lat=40.7066&start_lat=40.7505
  var lyft = axios.create({
    headers: { Authorization: AuthStr },
    params: {
      start_lat: 40.7505,
      start_lng: -73.9764,
      end_lat: 40.7066,
      end_lng: -74.0101,
    }
  })

  lyft.get('https://api.lyft.com/v1/cost').then((data) => {
    console.log('did we get cool stuff?', data.data)
    res.send(data.data)
  }).catch((err) => {
    console.log(err)
    res.send('no bueno')
  })
}).catch((err) => console.log(err))

})

// var twilioText = (user) => {
//   console.log('userObj',user);
//   client.messages.create({
//         to: `+1${user.attributes.phoneNumber}`,
//         from: '+16174405251',
//         body: `Hey ${user.attributes.firstName} ${user.attributes.lastName}, you've been invited to my event. Please click on the link below to share your location:
//         https://wayn-greenfield.herokuapp.com/#/event/${user.attributes.eventId}?userId=${user.id}`,
//     })
//     .then((message) => console.log('testing', message.sid))
//     .catch((err) => {
//       console.error('Could not notify administrator');
//       console.error(err);
//     });
// };

app.post('/userEvents', (req, res) => {
    User.query((qb) => {
      qb.select('*').from('users').where({
        firstName: req.body.name,
        phoneNumber: req.body.number
      })
      .then((response) => {
        res.send(response);
      })
    })
});

app.post('/usersEvents', (req, res) => {
  let promises = [];
  req.body.enteredUserInfo.forEach((user) => {
    Event.query((qb) => {
      promises.push(qb.select('*').from('events').where({
        id: user.eventId
      }))
    })
  })
  Promise.all(promises)
  .then((result) => {
    res.send(result);
  })
})

app.post('/eventAttendees', (req, res) => {
  let promises = [];
  console.log('made it to server event attendees')
  req.body.enteredUsersEvents.forEach((evt) => {
    User.query((qb) => {
      promises.push(qb.select('*').from('users').where({
        eventId: evt.id
      }))
    })
  })
  Promise.all(promises)
  .then((result) => {
    res.send(result);
  })
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


app.post('/event', (req, res) => {
  console.log('data from the client', req.body);
  let organizer = {
    firstName: req.body.organizerFirstName,
    lastName: req.body.organizerLastName,
    phoneNumber: req.body.organizerPhoneNumber
  };

  let event = {
    eventLatitude: req.body.location.lat,
    eventLongitude: req.body.location.lng,
    eventName: req.body.eventName,
    eventTime: req.body.time
  };

  let attendees = req.body.attendees;
  attendees.push(organizer);
  console.log('the attendees should include the organizer', attendees);

  controller.insert(attendees, event, twilioText)
    .then(() => res.sendStatus(200));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(port, function() {
  console.log('listening on port,', port);
});
