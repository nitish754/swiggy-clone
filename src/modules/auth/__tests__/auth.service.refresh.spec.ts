import { InvalidToken } from '../authError';
import { AuthService } from '../authService';
import { RefreshTokenRequestDTO } from '../authType';
import {
  AuthRepositoryMock,
  createAuthRepositoryMock,
} from './authRepository.mock';

const requestPayload: RefreshTokenRequestDTO = {
  refreshToken: 'refresh-token',
};

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
});
