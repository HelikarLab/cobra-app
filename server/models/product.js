const Sequelize = require('sequelize')
//const db = require('../config/database')

module.exports = db.define(
  'product',
  {
    metaboliteID: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'metabolite',
        key: 'id',
      },
      field: 'metabolite_id',
    },
    reactionId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'reaction',
        key: 'id',
      },
      field: 'reaction_id',
    },
  },
  {
    tableName: 'products',
  }
)
