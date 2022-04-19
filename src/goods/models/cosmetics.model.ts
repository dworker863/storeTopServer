import { IGood } from '../interfaces/IGood';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'cosmetics' })
export class Cosmetics extends Model<Cosmetics, IGood> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  characteristics: string;

  @Column({ type: DataType.STRING, allowNull: true })
  country: string;

  @Column({ type: DataType.STRING, allowNull: false })
  price: string;

  @Column({ type: DataType.STRING, allowNull: false })
  discount: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  hit: true;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.NUMBER, allowNull: false, defaultValue: 5 })
  rating: number;
}
