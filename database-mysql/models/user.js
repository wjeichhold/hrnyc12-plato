var db = require('../index.js');
// var bookshelf = require('bookshelf')

var User = db.Model.extend({
    tableName: 'users'
  });

module.exports = User;