const Sequelize = require('sequelize');

const db = {};
const sequelize = new Sequelize('defaults', 'root', 'root', {
  host: 3306,
  dialect: 'mysql',
  defaults: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;

db.sequelize.sync();

module.exports = db;
