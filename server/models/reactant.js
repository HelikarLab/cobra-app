const Sequelize = require('sequelize')
//const db = require('../config/database')

module.exports = db.define(
  'reactant',
  {
    metaboliteId: {
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
        model: 'reactions',
        key: 'id',
      },
      field: 'reaction_id',
    },
  },
  {
    tableName: 'reactants',
  }
)
