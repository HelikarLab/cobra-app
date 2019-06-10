const Sequelize = require('sequelize')
//const db = require('../config/database')

module.exports = db.define(
  'metabolite',
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
    charge: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'charge',
    },
    initialConcentration: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'initial_concentration',
    },
    modelId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'model',
        key: 'id',
      },
      field: 'model_id',
    },
  },
  {
    tableName: 'metabolites',
  }
)
