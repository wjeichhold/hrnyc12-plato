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

var insert = function() {
  console.log('insert functino invoked')
  knex('users').insert({
    id: 1,
    firstName: 'Hoang',
    lastName: 'Nguyen',
    phoneNumber: 9168959755,
    image: 'banana',
    latitude: 3.33,
    longitude: 3.33,
  })
  .then((results) => console.log(results))
}

module.exports.put = put;
exports.insert = insert;
