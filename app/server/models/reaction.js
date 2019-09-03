const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define(
    'reaction',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
        },
        reversible: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            field: 'reversible',
        },
        reactants: {
            type: Sequelize.ARRAY(Sequelize.JSONB),
            allowNull: true,
            field: 'reactants',
        },
        products: {
            type: Sequelize.ARRAY(Sequelize.JSONB),
            allowNull: true,
            field: 'products',
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
        tableName: 'reactions',
    }
);
