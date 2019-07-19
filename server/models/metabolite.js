const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define(
    'metabolite',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'name',
        },
        compartment: {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'compartment',
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
        tableName: 'metabolites',
    }
);
