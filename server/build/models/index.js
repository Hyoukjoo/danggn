"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const config_1 = require("../config");
const User_1 = require("./User");
const Product_1 = require("./Product");
const CarOption_1 = require("./CarOption");
const RealEstateOption_1 = require("./RealEstateOption");
function init() {
    const connectionUrl = config_1.default.db.url;
    const sequelize = new sequelize_1.Sequelize(connectionUrl);
    User_1.default.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: new sequelize_1.DataTypes.STRING(20),
            unique: true,
            autoIncrement: false,
            allowNull: false,
        },
        password: {
            type: new sequelize_1.DataTypes.STRING(150),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'users',
        engine: 'InnoDB',
        charset: 'utf8',
        indexes: [
            {
                fields: ['email'],
            },
        ],
        hooks: {
            beforeCreate: user => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            },
        },
    });
    Product_1.default.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        title: {
            type: new sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        image: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
        description: {
            type: new sequelize_1.DataTypes.STRING(100),
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'products',
        engine: 'InnoDB',
        charset: 'utf8',
    });
    CarOption_1.default.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        productId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        old: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        mileage: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        isSmoker: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'car_options',
        engine: 'InnoDB',
        charset: 'utf8',
    });
    RealEstateOption_1.default.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        productId: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        address: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
        },
        floor: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        size: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'real_estate_options',
        engine: 'InnoDB',
        charset: 'utf8',
    });
    User_1.default.hasMany(Product_1.default, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'products',
    });
    Product_1.default.hasOne(CarOption_1.default, {
        sourceKey: 'id',
        foreignKey: 'productId',
        as: 'carOptions',
    });
    Product_1.default.hasOne(RealEstateOption_1.default, {
        sourceKey: 'id',
        foreignKey: 'productId',
        as: 'realEstateOptions',
    });
    return sequelize;
}
exports.init = init;
