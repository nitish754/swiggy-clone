import ErrorCode from './ErrorCode';

export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;

  constructor(message: string, statusCode: number, errorCode: ErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
