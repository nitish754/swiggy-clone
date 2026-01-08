import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors/BaseError';
import { ZodError } from 'zod';
import ErrorCode from '../errors/ErrorCode';

export const handleError = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (BaseError.isBaseError(err)) {
    res.status(err.statusCode).json({
      message: 'API Generic Error',
      error: {
        code: err.errorCode,
        message: err.message,
      },
    });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Validation failed',
      error: {
        code: ErrorCode.VALIDATION_ERROR,
        path: err.issues[0]?.path,
        message: err.issues[0]?.message,
      },
    });
    return;
  }
  res.status(500).json({
    message: 'Internal Server Error',
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    },
  });

  next();
};
