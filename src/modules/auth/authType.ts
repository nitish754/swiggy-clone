import { z } from 'zod';
import { SignupSchema } from './dtos/request/signupSchema';
import { ApiResponse } from '@/shared/type/response';
import { LoginSchema } from './dtos/request/loginSchema';

export type SignupRequestDTO = z.infer<typeof SignupSchema>;

type UserDto = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type LoginDto = {
  token: string;
  refreshToken: string;
  user: UserDto;
};

export type SignupResponse = ApiResponse<UserDto>;

export type CreateUserPayload = Omit<SignupRequestDTO, 'password'> & {
  password: string;
};

export type LoginRequestDTO = z.infer<typeof LoginSchema>;

export type LoginResponse = ApiResponse<LoginDto>;

export type AuthTokenPayload = {
  id: number;
  email: string;
  name: string;
  role: string;
};
