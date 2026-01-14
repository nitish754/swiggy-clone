import { z } from 'zod';
import { SignupSchema } from './dtos/request/signupSchema';
import { ApiResponse } from '@/shared/type/response';
import { LoginSchema } from './dtos/request/loginSchema';
import { RefreshTokenSchema } from './dtos/request/RefreshTokenSchema';
import { DEVICE } from '@/generated/enums';

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
  iat: number;
  exp: number;
};

export type CreateAuthTokenPayload = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export type RefreshTokenRequestDTO = z.infer<typeof RefreshTokenSchema>;

export type RefreshTokenResponse = ApiResponse<Omit<LoginDto, 'user'>>;

export type CreateRefreshTokenType = {
  userId: number;
  token: string;
  expiresAt: Date;
  device: DEVICE;
};
