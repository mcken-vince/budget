import { Column, DataType, Max, Min, Table } from 'sequelize-typescript';
import { BaseEntity } from './base.entity';

@Table({ tableName: 'Category' })
export class CategoryEntity extends BaseEntity {
  @Min(1)
  @Max(50)
  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string;
}
