const Sequelize = require('sequelize')
//const db = require('../config/database')

module.exports = db.define(
  'model',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      field: 'id',
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'name',
    },
    sbmlLevel: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'sbml_level',
    },
    sbmlVersion: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'sbml_version',
    },
  },
  {
    tableName: 'models',
  }
)
