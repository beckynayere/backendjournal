const { Sequelize } = require('sequelize');

const config = require('../config/config');
// const sequelize = new Sequelize(config.development);

const User = require('./user')(sequelize, DataTypes);
const Journal = require('./journal')(sequelize, DataTypes);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false 
});

const db = {
  sequelize,
  Sequelize,
  User,
  Journal,
};

module.exports = { sequelize , Sequelize };