import * as bcrypt from 'bcrypt';
import { AuthService } from '../../authService';
import {
  AuthRepositoryMock,
  createAuthRepositoryMock,
} from '../mock/authRepository.mock';
import * as jwt from '@/shared/utils/jwt';
import { LoginRequestDTO } from '../../authType';
import { InvalidCredentialError } from '../../authError';

jest.mock('bcrypt');
jest.mock('@/shared/utils/jwt', () => ({
  generateAuthToken: jest.fn(),
  generateRefreshToken: jest.fn(),
}));

const validPayload: LoginRequestDTO = {
  email: 'test@example.com',
  password: 'password',
  isRemember: true,
  device: 'WEB',
};

describe('AuthServie.login', () => {
  let service: AuthService;
  let authRepositoryMock: jest.Mocked<AuthRepositoryMock>;

  beforeEach(() => {
    jest.clearAllMocks();
    authRepositoryMock = createAuthRepositoryMock();
    service = new AuthService(authRepositoryMock);
  });

  it('should login with valid credentials', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue({
      id: 1,
      firstName: 'Test',
      middeleName: null,
      lastName: 'Test',
      email: 'test@example.com',
      password: 'hashed-password',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (bcrypt.compare as jest.Mock).mockReturnValue(true);
    (jwt.generateAuthToken as jest.Mock).mockReturnValue('jwt-token');
    (jwt.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');
    authRepositoryMock.saveRefreshToken.mockResolvedValue({
      id: 1,
      token: 'refresh-token',
      device: 'WEB',
      expiresAt: new Date(),
      userId: 1,
      isRevoked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    const result = await service.login(validPayload);

    expect(authRepositoryMock.findByEmail).toHaveBeenLastCalledWith(
      'test@example.com'
    );
    expect(bcrypt.compare).toHaveBeenCalledWith(
      validPayload.password,
      'hashed-password'
    );
    expect(jwt.generateAuthToken).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: `Test Test`,
        role: 'USER',
      })
    );
    expect(jwt.generateRefreshToken).toHaveBeenCalled();
    expect(authRepositoryMock.saveRefreshToken).toHaveBeenCalledWith(
      expect.objectContaining({
        device: 'WEB',
        userId: 1,
        token: 'refresh-token',
        expiresAt: expect.any(Date) as unknown as Date,
      })
    );

    expect(result).toEqual(
      expect.objectContaining({
        status: 'SUCCESS',
        message: 'User logged in successfully',
        data: {
          token: 'jwt-token',
          refreshToken: 'refresh-token',
          user: {
            id: 1,
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'Test',
            role: 'USER',
          },
        },
      })
    );
  });

  it('should throw if email does not exist in db', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue(null);

    await expect(service.login(validPayload)).rejects.toBeInstanceOf(
      InvalidCredentialError
    );

    expect(bcrypt.compare as jest.Mock).not.toHaveBeenCalled();
    expect(jwt.generateAuthToken as jest.Mock).not.toHaveBeenCalled();
    expect(jwt.generateRefreshToken as jest.Mock).not.toHaveBeenCalled();
    expect(authRepositoryMock.saveRefreshToken).not.toHaveBeenCalled();
  });

  it('should throw error if Invalid password', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue({
      id: 1,
      firstName: 'Test',
      middeleName: null,
      lastName: 'Test',
      email: 'test@example.com',
      password: 'hashed-password',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(service.login(validPayload)).rejects.toBeInstanceOf(
      InvalidCredentialError
    );
  });
});
