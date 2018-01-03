var db = require('../config');
var Event = require('../models/event');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
