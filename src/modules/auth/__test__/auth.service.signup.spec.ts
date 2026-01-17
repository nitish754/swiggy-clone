import { AuthService } from '../authService';
import * as bcrypt from 'bcrypt';
import {
  AuthRepositoryMock,
  createAuthRepositoryMock,
} from './authRepository.mock';

jest.mock('bcrypt');

describe('AuthService.signup', () => {
  let authRepositoryMock: jest.Mocked<AuthRepositoryMock>;

  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    authRepositoryMock = createAuthRepositoryMock();
    service = new AuthService(authRepositoryMock);
  });

  it('should create user successfully when email does not exist', async () => {
    // Arrange
    authRepositoryMock.findByEmail.mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    authRepositoryMock.createUser.mockResolvedValue({
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

    // Act
    const result = await service.signup({
      firstName: 'Test',
      middleName: null,
      lastName: 'Test',
      email: 'test@example.com',
      password: '398549308',
      role: 'USER',
    });

    // Assert
    // const email = jest.spyOn(authRepositoryMock, 'findByEmail');

    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith(
      'test@example.com'
    );

    expect(bcrypt.hash).toHaveBeenCalledWith('398549308', 10);

    const user = jest.spyOn(authRepositoryMock, 'createUser');
    expect(user).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'test@example.com',
        password: 'hashed-password',
        firstName: 'Test',
        lastName: 'Test',
      })
    );

    expect(result).toEqual(
      expect.objectContaining({
        status: 'SUCCESS',
        message: 'User created successfully',
        data: {
          id: 1,
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'Test',
          role: 'USER',
        },
      })
    );
  });
});
