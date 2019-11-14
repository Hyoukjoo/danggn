import { Model, Association } from 'sequelize';
import CarOption from './CarOption';
import RealEstateOption from './RealEstateOption';

export default class Product extends Model {
  public id!: number;
  public userId!: number;
  public category!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public image!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    carOptions: Association<Product, CarOption>;
    realEstateOptions: Association<Product, RealEstateOption>;
  };
}
