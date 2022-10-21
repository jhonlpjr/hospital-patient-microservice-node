import { HttpStatus } from '@nestjs/common';

export namespace IResponse {
  export interface Standard<T> {
    statusCode?: HttpStatus;
    message?: string;
    data?: T;
  }

  export interface Error {
    name: string;
    detail: DetailError;
  }

  export interface DetailError {
    message: string;
    type: string;
    path: string;
    value: string;
    origin: string;
    instance: any;
    validatorKey: string;
    validatorName: string;
    validatorArgs: any[];
  }
}
