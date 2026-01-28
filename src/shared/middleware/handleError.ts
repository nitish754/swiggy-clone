import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors/BaseError';
import { ZodError } from 'zod';
import ErrorCode from '../errors/ErrorCode';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../type/response';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  let errorResponse: ErrorResponse = {
    status: 'FAILED',
    message: 'Internal Server Error!',
    errors: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    },
  };
  // console.log(err);
  if (BaseError.isBaseError(err)) {
    errorResponse = {
      status: 'FAILED',
      message: 'API Generic Error',
      errors: {
        code: err.errorCode,
        message: err.message,
      },
    };
    res.status(err.statusCode).json(errorResponse);
    return;
  }
  if (err instanceof ZodError) {
    errorResponse = {
      status: 'FAILED',
      message: 'Validation Failed',
      errors: {
        code: ErrorCode.VALIDATION_ERROR,
        path: err.issues[0]?.path,
        message: err.issues[0]?.message,
      },
    };
    res.status(400).json(errorResponse);
    return;
  }
  if (err instanceof PrismaClientKnownRequestError) {
    errorResponse = {
      status: 'FAILED',
      message: 'Validation Failed',
      errors: {
        code: ErrorCode.VALIDATION_ERROR,
        message: err.message,
      },
    };
    res.status(400).json(errorResponse);
    return;
  }
  if (err instanceof jwt.JsonWebTokenError) {
    errorResponse = {
      status: 'FAILED',
      message: 'Authorization Error !',
      errors: {
        code: ErrorCode.UNAUTHORIZED,
        message: err.message,
      },
    };
    res.status(401).json(errorResponse);
    return;
  }
  res.status(500).json(errorResponse);

  next();
};
