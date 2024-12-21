import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: unknown, host: ArgumentsHost): void {
        console.log("<<Masuk Global Exception");
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error'
        
        if(exception instanceof HttpException) {
            console.log("<<Masuk HttpException");
            console.log(exception, "<<exception");
            
            status = exception.getStatus();
            message = exception.getResponse()['message'] || message;
            error = exception.getResponse()['error'] || error;
        }
        // else if (exception instanceof NotFoundException) {
        //     console.log("<<Masuk NotFoundException");
        //     status = HttpStatus.NOT_FOUND;
        //     message = 'Resource not found';
        //     error = 'Not Found';
        // }

        response.status(status)
        .json({
            statusCode: status,
            message,
            error,
            path: request.url
        })
    }
}