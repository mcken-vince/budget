import { Column, DataType, HasMany, IsEmail, Max, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";
import { Budget } from "./budget.model";

@Table({tableName: 'User'})
export class User extends BaseModel {
    @Max(255)
    @Column({type: DataType.STRING(255), unique: true})
    username: string;

    @IsEmail
    @Max(255)
    @Column({type: DataType.STRING(255)})    
    email: string;

    @Max(255)
    @Column({type: DataType.STRING(255)})
    firstName: string;

    @Max(255)
    @Column({type: DataType.STRING(255)})
    lastName: string;

    // Relationships
    @HasMany(() => Budget, {foreignKey: 'idUser'})
    budgets: Budget[];
}