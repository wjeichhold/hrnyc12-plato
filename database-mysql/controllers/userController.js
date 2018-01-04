var User = require('../models/user');

// let user = {
//     firstName: 'Rick',
//     lastName: 'Sanchez',
//     phoneNumber: 1234567890
//   }
//   var insertUser = (user) => { 
//     User.find({ where: { id: id } });
//   }

const put = (req, res) => {
  let userId = req.body.userId;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;

  new User({userId: userId})
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
    res.sendStatus(201);
  })

}

module.exports.put = put;
