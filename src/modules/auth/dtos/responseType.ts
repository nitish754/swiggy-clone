import { ApiResponse } from '@/shared/type/response';

export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  OWNER: 'OWNER',
  SUPERADMIN: 'SUPERADMIN',
} as const;

export type UserRole = typeof UserRole;

export type UserDto = {
  id: number;
  email: string;
  role: UserRole;
  firstName: string;
  middleName?: string | null;
  lastName: string;
};

export type LoginResponse = ApiResponse<{
  accessToken: string;
  user: UserDto;
}>;

export type SingupResponse = ApiResponse<{
  user: UserDto;
}>;
