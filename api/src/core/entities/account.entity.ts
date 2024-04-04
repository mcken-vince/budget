import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { TransactionEntity } from './transaction.entity';

@Table({ tableName: 'Account' })
export class AccountEntity extends BaseEntity {
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUser: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @Column({ type: DataType.STRING(25), allowNull: false })
  type: string;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  initialBalance: number;

  @Column({ type: DataType.FLOAT, allowNull: false, defaultValue: 0 })
  currentBalance: number;

  @HasMany(() => TransactionEntity, { onDelete: 'CASCADE' })
  transactions: TransactionEntity[];
}
