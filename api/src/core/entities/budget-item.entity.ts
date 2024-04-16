import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Max,
  Table,
} from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { CategoryEntity } from './category.entity';
import { BudgetEntity } from './budget.entity';

@Table({ tableName: 'BudgetItem' })
export class BudgetItemEntity extends BaseEntity {
  @ForeignKey(() => BudgetEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idBudget: number;

  @ForeignKey(() => CategoryEntity)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idCategory: number;

  @Max(255)
  @Column({ type: DataType.STRING(255), allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    defaultValue: 'spending',
  })
  type: 'spending' | 'income';

  // Relations
  @BelongsTo(() => CategoryEntity)
  category: CategoryEntity;
}
