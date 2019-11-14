import { Model, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, Association } from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';

import Product from './Product';

export default class User extends Model {
  public id!: number;
  public email!: number;
  public password!: string;

  validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }

  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public addProduct!: HasManyAddAssociationMixin<Product, number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    products: Association<User, Product>;
  };
}
