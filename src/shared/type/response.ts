export type ResponseStatus = 'SUCCESS' | 'FAILED' | 'ERROR';

export type ApiResponse<T> = {
  status: ResponseStatus;
  message: string;
  data: T;
  errors?: T;
};
