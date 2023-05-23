'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        static associate(models) {}
    }
    Cart.init({
        product_id: DataTypes.BIGINT,
        product_type: DataTypes.INTEGER,
        full_price: DataTypes.BIGINT,
        sale_price: DataTypes.BIGINT,
        agent_id: DataTypes.BIGINT,
        event_id: DataTypes.BIGINT,
        is_closed: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        customer_id: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'Cart',
    }, );

    Cart.associate = (models) => {
        // associations can be defined here
        Cart.belongsTo(models.Product, { foreignKey: 'product_id', });
    };
    return Cart;
};