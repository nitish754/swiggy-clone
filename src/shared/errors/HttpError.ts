import { BaseError } from './BaseError';
import ErrorCode from './ErrorCode';

export class HttpError extends BaseError {
  constructor(message: string, statusCode?: number) {
    super(message, statusCode || 500, ErrorCode.INTERNAL_SERVER_ERROR);
  }
}

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(message, 400, ErrorCode.BAD_REQUEST);
  }
}
export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401, ErrorCode.UNAUTHORIZED);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 403, ErrorCode.FORBIDDEN);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404, ErrorCode.NOT_FOUND);
  }
}
