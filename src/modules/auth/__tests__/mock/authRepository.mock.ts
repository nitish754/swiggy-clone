import { IAuthRepository } from '../../authRepository';

export type AuthRepositoryMock = {
  findByEmail: jest.MockedFunction<IAuthRepository['findByEmail']>;
  createUser: jest.MockedFunction<IAuthRepository['createUser']>;
  findById: jest.MockedFunction<IAuthRepository['findById']>;
  saveRefreshToken: jest.MockedFunction<IAuthRepository['saveRefreshToken']>;
  getDataByRefreshToken: jest.MockedFunction<
    IAuthRepository['getDataByRefreshToken']
  >;
  revokeRefreshToken: jest.MockedFunction<
    IAuthRepository['revokeRefreshToken']
  >;
};

export const createAuthRepositoryMock = (): AuthRepositoryMock => ({
  findByEmail: jest.fn(),
  createUser: jest.fn(),
  findById: jest.fn(),
  getDataByRefreshToken: jest.fn(),
  saveRefreshToken: jest.fn(),
  revokeRefreshToken: jest.fn(),
});
