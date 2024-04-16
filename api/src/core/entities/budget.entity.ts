import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Max,
  Table,
} from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { BudgetItemEntity } from './budget-item.entity';

@Table({ tableName: 'Budget' })
export class BudgetEntity extends BaseEntity {
  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUser: number;

  @Max(255)
  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  month: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  totalAmount: number;

  @Column({ type: DataType.FLOAT })
  remainingAmount: number;

  // Relations
  @HasMany(() => BudgetItemEntity, { onDelete: 'CASCADE' })
  budgetItems: BudgetItemEntity[];
}
