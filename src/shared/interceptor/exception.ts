import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import {
  Response as ResponseException,
} from 'src/shared/classes/response.class';
import { Response } from 'express';
import {} from 'sequelize';
import { RpcException } from '@nestjs/microservices';
@Catch(RpcException)
export class RcpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    this.response(exception, response);
  }

  response(exception: unknown, response: Response) {
    let RcpExceptionMessage: ResponseException.Standard<any> = {
      statusCode: 500,
      message: 'server error',
      data: [],
    };
    if (exception instanceof RpcException) {
      RcpExceptionMessage = new ResponseException.Standard<any>({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        data: exception.getError(),
      });
      response.status(RcpExceptionMessage.statusCode).json(RcpExceptionMessage);
    } else {
      console.log(exception);
    }
  }

  sanitaze(message: any) {
    return String(message).split('#');
  }
}
