import { InvalidToken } from '../../authError';
import { AuthService } from '../../authService';
import { RefreshTokenRequestDTO } from '../../authType';
import {
  AuthRepositoryMock,
  createAuthRepositoryMock,
} from '../mock/authRepository.mock';
import * as jwt from '@/shared/utils/jwt';

const requestPayload: RefreshTokenRequestDTO = {
  refreshToken: 'refresh-token',
};

jest.mock('@/shared/utils/jwt', () => ({
  generateAuthToken: jest.fn(),
  generateRefreshToken: jest.fn(),
}));

describe('AuthServie.refreshToken', () => {
  let service: AuthService;
  let authRepositoryMock: jest.Mocked<AuthRepositoryMock>;

  beforeEach(() => {
    jest.resetAllMocks();
    authRepositoryMock = createAuthRepositoryMock();
    service = new AuthService(authRepositoryMock);
  });

  it('should throw error if invalid refresh token received', async () => {
    authRepositoryMock.getDataByRefreshToken.mockResolvedValue(null);

    await expect(service.refreshToken(requestPayload)).rejects.toBeInstanceOf(
      InvalidToken
    );
    expect(authRepositoryMock.findById).not.toHaveBeenCalled();
  });

  it('should throw an error if valid token but user not found in DB', async () => {
    authRepositoryMock.getDataByRefreshToken.mockResolvedValue({
      id: 1,
      token: 'refresh-token',
      expiresAt: expect.any(Date) as unknown as Date,
      device: 'WEB',
      userId: 1,
      isRevoked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    authRepositoryMock.findById.mockResolvedValue(null);

    await expect(service.refreshToken(requestPayload)).rejects.toBeInstanceOf(
      InvalidToken
    );

    expect(authRepositoryMock.getDataByRefreshToken).toHaveBeenCalledWith(
      requestPayload.refreshToken
    );
    expect(authRepositoryMock.findById).toHaveBeenCalledWith(1);
    expect(authRepositoryMock.revokeRefreshToken).not.toHaveBeenCalled();
  });

  it('should generate new auth and refresh token successful', async () => {
    authRepositoryMock.getDataByRefreshToken.mockResolvedValue({
      id: 1,
      token: 'refresh-token',
      userId: 1,
      device: 'WEB',
      isRevoked: false,
      expiresAt: expect.any(Date) as Date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    authRepositoryMock.findById.mockResolvedValue({
      id: 1,
      firstName: 'Test',
      middeleName: null,
      lastName: 'Test',
      email: 'test@example.com',
      role: 'USER',
      password: 'hashed-password',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    authRepositoryMock.revokeRefreshToken.mockResolvedValue({
      id: 1,
      token: 'refresh-token',
      userId: 1,
      device: 'WEB',
      isRevoked: true,
      expiresAt: expect.any(Date) as Date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (jwt.generateAuthToken as jest.Mock).mockReturnValue('jwt-token');
    (jwt.generateRefreshToken as jest.Mock).mockReturnValue('refresh-token');

    authRepositoryMock.saveRefreshToken.mockResolvedValue({
      id: 1,
      token: 'refresh-token',
      userId: 1,
      device: 'WEB',
      isRevoked: false,
      expiresAt: expect.any(Date) as Date,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Act
    const result = await service.refreshToken(requestPayload);

    expect(authRepositoryMock.getDataByRefreshToken).toHaveBeenCalledWith(
      requestPayload.refreshToken
    );
    expect(authRepositoryMock.findById).toHaveBeenCalledWith(1);

    expect(authRepositoryMock.revokeRefreshToken).toHaveBeenCalledWith(
      requestPayload.refreshToken
    );

    expect(jwt.generateAuthToken).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        email: 'test@example.com',
        name: 'Test Test',
        role: 'USER',
      })
    );

    expect(jwt.generateRefreshToken).toHaveBeenCalled();
    expect(authRepositoryMock.saveRefreshToken).toHaveBeenCalledWith(
      expect.objectContaining({
        device: 'WEB',
        userId: 1,
        expiresAt: expect.any(Date) as Date,
        token: 'refresh-token',
      })
    );
    expect(result).toEqual(
      expect.objectContaining({
        status: 'SUCCESS',
        message: 'token generated successfully',
        data: {
          token: 'jwt-token',
          refreshToken: 'refresh-token',
        },
      })
    );
  });
  // adding for ammend test
});
