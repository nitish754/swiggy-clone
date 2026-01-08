import ErrorCode from './ErrorCode';

export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;

  constructor(message: string, statusCode: number, errorCode: ErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Error.captureStackTrace(this, this.constructor);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  static isBaseError(error: unknown): error is BaseError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      'errorCode' in error
    );
  }
}
