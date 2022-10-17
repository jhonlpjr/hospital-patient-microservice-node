import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class Patient extends Model {
    @PrimaryKey
    @Column
    Patient_ID: number;
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
