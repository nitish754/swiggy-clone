import ErrorCode from '../errors/ErrorCode';

export type ResponseStatus = 'SUCCESS' | 'FAILED' | 'ERROR';

export type ApiResponse<T> = {
  status: ResponseStatus;
  message: string;
  data: T;
};

export type ApiErrorResponse<T> = {
  status: ResponseStatus;
  message: string;
  errors: T;
};

export type ErrorBody = {
  code: ErrorCode;
  path?: unknown;
  message: string | undefined;
};

export type ErrorResponse = ApiErrorResponse<ErrorBody>;
