import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { UpdateValuesMissingError } from 'typeorm';
import { BaseResponse } from '../response/base.response';

@Catch(UpdateValuesMissingError)
export class UpdateValuesMissingErrorFilter implements ExceptionFilter {
  catch(exception: UpdateValuesMissingError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = new BaseResponse(
      null,
      exception.message,
      400,
      new Date().toISOString(),
    );
    console.log('Exception: ', exceptionResponse, request.url);

    response.status(400).json(exceptionResponse);
  }
}
