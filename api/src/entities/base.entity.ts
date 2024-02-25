import { Column, DataType, Model, Sequelize } from 'sequelize-typescript';

export abstract class BaseEntity extends Model {
  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false,
  })
  modifiedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @Column({ type: DataType.BOOLEAN, defaultValue: true, allowNull: false })
  active: boolean;
}
