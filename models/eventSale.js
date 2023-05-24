'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class eventSale extends Model {
        static associate(models) {}
    }
    eventSale.init({
        agent_id: DataTypes.BIGINT,
        percent_sale: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        expired_at: DataTypes.DATE,
        listProductType: DataTypes.STRING,
        customer_id: DataTypes.BIGINT
    }, {
        sequelize,
        modelName: 'eventSale',
        timestamps: false,
    }, );

    return eventSale;
};