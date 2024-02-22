import { Column, DataType, Model } from "sequelize-typescript";

export class BaseModel extends Model {
    @Column({type: DataType.DATE, defaultValue: () => new Date()})
    createdAt: Date;

    @Column({type: DataType.DATE, defaultValue: () => new Date()})
    modifiedAt: Date;
    
    @Column({type: DataType.DATE, allowNull: true})
    deletedAt: Date;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    active: boolean;
}