import { IsNumber } from "@nestjs/class-validator";

export class CreatePatientReqDto {
    Patient_ID: number;
    ID: string;
    First_name: string;
    Last_name: string;
    Email: string;
    Phone: string;
}
