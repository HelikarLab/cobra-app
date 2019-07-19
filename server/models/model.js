const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define(
    'model',
    {
        fileId:{
            type: Sequelize.STRING,
            allowNull: false,
            field: 'file_id'
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
        },
        jsonModel: {
            type: Sequelize.JSONB,
            allowNull: false,
            field: 'json_model',
        },
    },
        {
        tableName: 'models',
        }
);
