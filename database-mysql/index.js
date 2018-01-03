var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : 'wayn.ccpnt53lucxn.us-east-2.rds.amazonaws.com',
    user     : 'Administrator',
    password : 'bananas18',
    database : 'WAYN_HRNYC12',
    charset  : 'utf8'
  }
});
 
var bookshelf = require('bookshelf')(knex);
 
bookshelf.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    bookshelf.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('firstName', 255);
      user.string('lastName', 255);
      user.integer('phoneNumber', 100);
      user.string('image', 255);
      user.integer('currentLoc,');
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});