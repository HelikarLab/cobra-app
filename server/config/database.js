/* Database Config file (Defines the connection with the database) */
const Sequelize = require('sequelize')
require('dotenv').config()

/*

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
)
*/
