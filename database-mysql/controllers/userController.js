var db = require('../database-mysql');

// let user = {
//     firstName: 'Rick',
//     lastName: 'Sanchez',
//     phoneNumber: 1234567890
//   }
//   var insertUser = (user) => { 
//     User.find({ where: { id: id } });
//   }


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

const put = (req, res) => {
  let userId = req.body.userId;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
}

module.exports.put = put;
exports.insert = insert;
