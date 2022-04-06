import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUser } from '../interfaces/user.interface';

@Table({ tableName: 'users' })
export class User extends Model<User, IUser> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  tel: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  role: 'Admin' | 'User';

  @Column({ type: DataType.STRING, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  postIndex: string;
}
