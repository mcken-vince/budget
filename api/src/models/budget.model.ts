import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsDate, Max, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { User } from "./user.model";
import { Transaction } from "./transaction.model";

@Table({tableName: 'Budget'})
export class Budget extends BaseModel {
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    idUser: number

    @Max(255)
    @Column({type: DataType.STRING(255)})
    name: string

    @IsDate
    @Column({type: DataType.DATE})
    startDate: Date
    
    @IsDate
    @Column({type: DataType.DATE})
    endDate: Date

    @Column({type: DataType.FLOAT})
    totalAmount: number;

    @Column({type: DataType.FLOAT})
    remainingAmount: number;

// Relationships
    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Transaction, {foreignKey: 'idBudget'})
    transactions: Transaction[]
}