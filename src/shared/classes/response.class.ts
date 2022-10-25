import { HttpStatus } from "@nestjs/common";
import { IResponse } from "src/shared/interfaces/response.interface";

export namespace Response {
    export class Standard<T> implements IResponse.Standard<T> {
        statusCode?: HttpStatus;
        message?: string;
        data?: T;
    
        constructor(partial?: Partial<Standard<T>>) {
            this.statusCode = partial.statusCode;
            this.message = partial.message;
            this.data = partial.data;
        }
    }
    
    export class Fail extends Standard<IResponse.Error>{
        constructor(partial?: Partial<Standard<IResponse.Error>>) {
            super();
            this.message = 'error';
            this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            this.data = partial.data;
        }
    }
}
