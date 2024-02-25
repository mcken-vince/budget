import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Max,
  Min,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { BudgetEntity } from './budget.entity';
import { UserEntity } from './user.entity';

@Table({ tableName: 'Transaction' })
export class TransactionEntity extends BaseEntity {
  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUser: number;

  @ForeignKey(() => BudgetEntity)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idBudget: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  idCategory: number;

  @Min(1)
  @Max(255)
  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Max(1000)
  @Column({ type: DataType.STRING(1000), allowNull: true })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('getdate'),
  })
  date: Date;

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number;

  // Relationships
  @BelongsTo(() => BudgetEntity)
  budget: BudgetEntity;
}
