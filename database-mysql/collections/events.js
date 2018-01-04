var db = require('../index.js');
var Event = require('../models/event');

var Events = new db.Collection();

Events.model = event;

module.exports = Events;
