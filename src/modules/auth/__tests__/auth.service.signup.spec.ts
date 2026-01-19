import { AuthService } from '../authService';
import * as bcrypt from 'bcrypt';
import {
  AuthRepositoryMock,
  createAuthRepositoryMock,
} from './authRepository.mock';
import { DuplicateEmail } from '../authError';
import { SignupRequestDTO } from '../authType';

jest.mock('bcrypt');

describe('AuthService.signup', () => {
  let authRepositoryMock: jest.Mocked<AuthRepositoryMock>;

  let service: AuthService;

  let validPayload: SignupRequestDTO = {
    firstName: 'Test',
    middleName: null,
    lastName: 'Test',
    email: 'test@example.com',
    password: '398549308',
    role: 'USER',
  };

  beforeEach(() => {
    jest.resetAllMocks();
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
    const result = await service.signup(validPayload);

    // Assert

    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith(
      'test@example.com'
    );

    expect(bcrypt.hash).toHaveBeenCalledWith('398549308', 10);

    expect(authRepositoryMock.createUser).toHaveBeenCalledWith(
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

  it('should not create user if email already exist in db', async () => {
    // Arrange
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

    // Act
    await expect(service.signup(validPayload)).rejects.toBeInstanceOf(
      DuplicateEmail
    );

    // Assertion
    expect(authRepositoryMock.findByEmail).toHaveBeenCalledWith(
      'test@example.com'
    );
    expect(bcrypt.hash as jest.Mock).not.toHaveBeenCalled();
    expect(authRepositoryMock.createUser).not.toHaveBeenCalled();
  });

  it('should throw an error if password hashing failed', async () => {
    // Arrnage
    authRepositoryMock.findByEmail.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

    await expect(service.signup(validPayload)).rejects.toThrow(
      'Hashing failed'
    );
    expect(authRepositoryMock.createUser).not.toHaveBeenCalled();
  });

  it('should throw error if repository failed to create user', async () => {
    // Arrange
    authRepositoryMock.findByEmail.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    authRepositoryMock.createUser.mockRejectedValue(
      new Error('User creation failed')
    );

    // Act & Assertion
    await expect(service.signup(validPayload)).rejects.toThrow(
      'User creation failed'
    );
  });

  it('should hash the plain password received in payload', async () => {
    authRepositoryMock.findByEmail.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    authRepositoryMock.createUser.mockResolvedValue({
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

    await service.signup(validPayload);

    expect(bcrypt.hash).toHaveBeenCalledWith(validPayload.password, 10);
  });
});
