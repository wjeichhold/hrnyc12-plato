const Sequelize = require('sequelize');
const sequelize = new Sequelize('WAYN_HRNYC12', 'Administrator', 'bananas18', {
  host: 'wayn.ccpnt53lucxn.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true,
    autoIncrement: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  phoneNumber: Sequelize.INTEGER,
  image: Sequelize.STRING,
  currentLocation: Sequelize.INTEGER 
});

const Event = sequelize.define('event', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true,
    autoIncrement: true
  },
  eventLocation: Sequelize.INTEGER,
  eventName: Sequelize.INTEGER,
  eventTime: Sequelize.INTEGER
})

sequelize.sync({force: true})
  .then(() => User.create({
    id: 1,
    firstName: 'jane',
    lastName: 'doe',
    phoneNumber: 123456789
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });

sequelize.sync({force: true})
  .then(() => Event.create({
    id: 1,
    eventLocation: 'hack reactor',
    eventName: 'hackathon',
    eventTime: 123456789
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })
  