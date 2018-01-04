var db = require('../index.js');

var Event = bookshelf.Model.extend({
    tableName: 'events'
  });

module.exports = Event;


///model => collection => controller