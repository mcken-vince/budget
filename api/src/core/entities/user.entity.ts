import {
  Column,
  DataType,
  HasMany,
  IsEmail,
  Max,
  Min,
  Table,
} from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { BudgetEntity } from './budget.entity';

@Table({ tableName: 'User' })
export class UserEntity extends BaseEntity {
  @IsEmail
  @Max(255)
  @Column({ type: DataType.STRING(255), unique: true, allowNull: false })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Min(1)
  @Max(255)
  @Column({ type: DataType.STRING(255), allowNull: false })
  firstName: string;

  @Min(1)
  @Max(255)
  @Column({ type: DataType.STRING(255), allowNull: false })
  lastName: string;

  // Relationships
  @HasMany(() => BudgetEntity, { foreignKey: 'idUser' })
  budgets: BudgetEntity[];
}
