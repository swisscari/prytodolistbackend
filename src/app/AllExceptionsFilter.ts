import {
    Catch,
    HttpStatus,
    ArgumentsHost,
    ExceptionFilter,
} from '@nestjs/common';

import { Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(err: any, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const res = host.switchToHttp().getResponse() as Response;
        const statusCode = err.status ?? HttpStatus.INTERNAL_SERVER_ERROR;

        httpAdapter.reply(res, {
            statusCode,
            message: err.message
        }, statusCode);
    }
}