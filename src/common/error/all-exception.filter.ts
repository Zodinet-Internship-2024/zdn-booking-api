import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseResponse } from '../response/base.response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Handle any exception
    const message = 'Something went wrong';
    const exceptionResponse = new BaseResponse(
      null,
      exception instanceof Error ? exception.message : message,
      500,
      new Date().toISOString(),
    );
    console.log('Exception: ', exceptionResponse, request.url);

    response.status(500).json(exceptionResponse);
  }
}
