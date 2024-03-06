import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Max,
  Min,
  Table,
} from 'sequelize-typescript';
import { BaseEntity } from './base.entity';
import { TransactionEntity } from './transaction.entity';
import { UserEntity } from './user.entity';

@Table({ tableName: 'Category' })
export class CategoryEntity extends BaseEntity {
  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  idUser: number;

  @Min(1)
  @Max(50)
  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;

  @HasMany(() => TransactionEntity)
  transactions: TransactionEntity[];
}
