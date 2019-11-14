import { Sequelize, DataTypes } from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';

import config from '../config';

import User from './User';
import Product from './Product';
import CarOption from './CarOption';
import RealEstateOption from './RealEstateOption';

export function init(): Sequelize {
  const connectionUrl: string = config.db.url;
  const sequelize = new Sequelize(connectionUrl);

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: new DataTypes.STRING(20),
        unique: true,
        autoIncrement: false,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(150),
        allowNull: false,
      },
    },
    {
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
    },
  );

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL.UNSIGNED,
        allowNull: false,
      },
      title: {
        type: new DataTypes.STRING(20),
        allowNull: false,
      },
      image: {
        type: new DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: new DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'products',
      engine: 'InnoDB',
      charset: 'utf8',
    },
  );

  CarOption.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      old: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      mileage: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isSmoker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'car_options',
      engine: 'InnoDB',
      charset: 'utf8',
    },
  );

  RealEstateOption.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      floor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      size: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'real_estate_options',
      engine: 'InnoDB',
      charset: 'utf8',
    },
  );

  User.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'products',
  });

  Product.hasOne(CarOption, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'carOptions',
  });

  Product.hasOne(RealEstateOption, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'realEstateOptions',
  });

  return sequelize;
}
