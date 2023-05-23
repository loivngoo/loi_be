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
        expried_at: DataTypes.DATE,
        listProductType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'eventSale',
    }, );

    return eventSale;
};