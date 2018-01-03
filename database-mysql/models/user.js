var db = require('../config');

var User = bookshelf.Model.extend({
    tableName: 'users'
  });

module.exports = User;