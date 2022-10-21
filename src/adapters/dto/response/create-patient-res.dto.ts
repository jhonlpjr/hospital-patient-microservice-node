import { HttpStatus } from "@nestjs/common";
import { Patient } from "src/domain/entities/patient.entity";
import Verificate from "src/shared/functions/validate";
import { IResponse } from "src/shared/interfaces/response.interface";

export class CreatePatientResDto implements IResponse.Standard<Patient> {
    statusCode?: HttpStatus;
    message?: string;
    data?: Patient;

    constructor(partial?: Patient) {
        if(Verificate(partial)) {
            this.statusCode = HttpStatus.OK;
            this.message = 'Patient registered.';
            this.data = partial;
        } else {
            this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            this.message = 'Problems to register patient.';
            this.data = partial;
        }
    }
}
