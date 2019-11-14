import { Model } from 'sequelize';

class CarOption extends Model {
  public id!: number;
  public productId!: number;
  public old!: number;
  public mileage!: number;
  public isSmoker!: boolean;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export default CarOption;
