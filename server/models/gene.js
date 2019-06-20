const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.define(
    'gene',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
        },
        sbmlId: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'sbml_id',
        },
        functional: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            field: 'functional',
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
        tableName: 'genes',
    }
);
