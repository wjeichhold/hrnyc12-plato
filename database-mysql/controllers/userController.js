
var Users = require('../collections/users');
var Events = require('../collections/events');
var User = require('../models/user');

const put = (req, res) => {
  let userId = req.body.userId;
  let latitude = req.body.lat;
  let longitude = req.body.lng;

  new User({id: userId})
  .fetch()
  .then((user) => {
    if (user) {
        user.set('latitude', latitude);
        user.set('longitude', longitude);
        return user.save();
    } else {
      console.error('No user found with that ID, could not update location!');
    }
  })
  .then(() => {
    res.sendStatus(200);
  });
}

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


module.exports.put = put;
exports.insert = insert;
