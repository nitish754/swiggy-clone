import { z } from 'zod';
import { SignupSchema } from './dtos/request/signupSchema';
import { ApiResponse } from '@/shared/type/response';

export type SingupRequestDTO = z.infer<typeof SignupSchema>;

type UserDto = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type SignupResponse = ApiResponse<UserDto>;

export type CreateUserPayload = Omit<SingupRequestDTO, 'password'> & {
  password: string;
};
