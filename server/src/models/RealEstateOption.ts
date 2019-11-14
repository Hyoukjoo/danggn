import { Model } from 'sequelize';

class RealEstateOption extends Model {
  public id!: number;
  public productId!: number;
  public address!: string;
  public floor!: number;
  public size!: number;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export default RealEstateOption;
