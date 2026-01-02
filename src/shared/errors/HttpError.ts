import { BaseError } from './BaseError';
import ErrorCode from './ErrorCode';

export class HttpError extends BaseError {
  constructor(message: string) {
    super(message, 500, ErrorCode.INTERNAL_SERVER_ERROR);
  }
}
