const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define(
  'sbmlFile',
  {
    fileBytes: {
      type: Sequelize.BLOB,
      allowNull: false,
      field: 'file_bytes',
    },
    modelId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'models',
        key: 'id',
      },
      field: 'model_id',
    },
  },
  {
    tableName: 'sbml_files',
  }
)
