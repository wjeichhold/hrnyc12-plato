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

module.exports.put = put;
