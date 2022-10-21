import { Column, Model, PrimaryKey, Table, AutoIncrement, Length, Unique } from "sequelize-typescript";

@Table
export class Patient extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    Patient_ID: number;
    @Unique
    @Column
    ID: string;
    @Column
    First_name: string;
    @Column
    Last_name: string;
    @Column
    Email: string;
    @Column
    Phone: string;
}
