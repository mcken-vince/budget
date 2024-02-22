import { BelongsTo, Column, DataType, ForeignKey, Max, Min, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { Budget } from "./budget.model";

@Table({tableName: 'Transaction'})
export  class Transaction extends BaseModel {
    @ForeignKey(() => Budget)
    @Column
    idBudget: number;

    @Column
    idCategory: number;

    @Min(1)
    @Max(255)
    @Column({type: DataType.STRING(255)})
    name: string;

    @Max(1000)
    @Column({type: DataType.STRING(1000), allowNull: true})
    description: string;

    @Column({type: DataType.FLOAT})
    amount: number;

    // Relationships
    @BelongsTo(() => Budget)
    budget: Budget;
}