import { BaseError } from '@/shared/errors/BaseError';
import ErrorCode from '@/shared/errors/ErrorCode';

export class InvalidCredentialError extends BaseError {
  constructor(message: 'Invalid email or password') {
    super(message, 400, ErrorCode.AUTH_INVALID_CREDENTIALS);
  }
}

export class DuplicateEmail extends BaseError {
  constructor(message: 'Email already exist.') {
    super(message, 400, ErrorCode.BAD_REQUEST);
  }
}

export class InvalidToken extends BaseError {
  constructor(message = 'Invalid or expired token') {
    super(message, 401, ErrorCode.UNAUTHORIZED);
  }
}
