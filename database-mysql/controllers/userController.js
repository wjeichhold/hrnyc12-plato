// var db = require('../database-mysql');
var Users = require('../collections/users');
var Events = require('../collections/events');

// partially working insert method,
// need to fix async issues because I want to be able to res.send on the server side


  var insert = (users, event, twilio) => {
    console.log('insert functino invoked');
    return Events.create({
      eventLatitude: event.eventLatitude,
      eventLongitude: event.eventLongitude,
      eventName: event.eventName,
      eventTime: event.eventTime
    }).then( (result) => {
       users.forEach( user => {
        Users.create({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          eventId: result.attributes.id
        }).then( (result) => twilio(result));
      })
    // res.send();
    })
  }

  exports.insert = insert;
