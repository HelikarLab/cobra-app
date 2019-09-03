/* Database Config file (Defines the connection with the database) */
const Sequelize = require('sequelize');
require('dotenv').config();

module.exports = new Sequelize(
  process.env.APP_DB_NAME,
  process.env.APP_DB_USERNAME,
  process.env.APP_DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.APP_DB_HOST || 'localhost',
    port: process.env.APP_DB_PORT || 5432,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);
