import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsDate,
  Max,
  Table,
} from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TransactionEntity } from './transaction.entity';

@Table({ tableName: 'Budget' })
export class BudgetEntity extends BaseEntity {
  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUser: number;

  @Max(255)
  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @IsDate
  @Column({ type: DataType.DATE, allowNull: false })
  startDate: Date;

  @IsDate
  @Column({ type: DataType.DATE, allowNull: false })
  endDate: Date;

  @Column({ type: DataType.FLOAT, allowNull: false })
  totalAmount: number;

  @Column({ type: DataType.FLOAT })
  remainingAmount: number;

  // Relationships
  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @HasMany(() => TransactionEntity, { foreignKey: 'idBudget' })
  transactions: TransactionEntity[];
}
