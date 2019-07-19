const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define(
    'gene',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'name',
        },
        functional: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'functional',
        },
        modelId: {
            type: Sequelize.BIGINT,
            allowNull: true,
            references: {
                model: 'models',
                key: 'id',
            },
            field: 'model_id',
        },
    },
    {
        tableName: 'genes',
    }
);
