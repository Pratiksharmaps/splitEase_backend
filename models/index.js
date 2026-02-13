const { Sequelize } = require('sequelize');
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
});

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ DB connected'))
  .catch(err => console.error('❌ DB connection failed:', err));

const db = {};
db.sequelize = sequelize;

// Example model
db.User = require('./user.js')(sequelize, Sequelize);
db.Group = require('./group.js')(sequelize, Sequelize);
db.Expense = require('./expense.js')(
  sequelize, Sequelize
); 

// ⚡ Call associations here
if (db.User.associate) {
  db.User.associate(db);
}
if (db.Group.associate) {
  db.Group.associate(db);
}
if (db.Expense.associate) {
  db.Expense.associate(db);
}
 
module.exports = db;
