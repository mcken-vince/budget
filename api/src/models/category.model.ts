import { Column, DataType, Max, Min, Table } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({tableName: 'Category'})
export class Category extends BaseModel {
    @Min(1)
    @Max(50)
    @Column({type: DataType.STRING(50)})
    name: string;

}