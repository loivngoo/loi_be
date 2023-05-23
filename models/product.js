'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {}
    }
    Product.init(
        {
            product_name: DataTypes.STRING,
            product_type: DataTypes.INTEGER,
            full_price: DataTypes.BIGINT,
            image_path: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
            timestamps: false,
        },
    );

    return Product;
};
