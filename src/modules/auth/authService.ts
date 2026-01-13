import { NotFoundError } from '@/shared/errors/HttpError';
import { DuplicateEmail, InvalidCredentialError } from './authError';
import { AuthRepository } from './authRepository';
import { LoginRequestDTO, LoginResponse, SignupRequestDTO } from './authType';
import { SignupResponse } from './authType';
import * as bcrypt from 'bcrypt';
import { generateAuthToken, generateRefreshToken } from '@/shared/utils/jwt';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signup(payload: SignupRequestDTO): Promise<SignupResponse> {
    const existingUser = await this.authRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new DuplicateEmail('Email already exist.');
    }
    // hash the password
    payload.password = await bcrypt.hash(payload.password, 10);
    const user = await this.authRepository.createUser(payload);
    if (!user) {
      throw new Error('User creation failed');
    }
    return {
      status: 'SUCCESS',
      message: 'User created successfully',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async login(payload: LoginRequestDTO): Promise<LoginResponse> {
    const user = await this.authRepository.findByEmail(payload.email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isPasswordMatched = await bcrypt.compare(
      payload.password,
      user.password
    );
    if (!isPasswordMatched) {
      throw new InvalidCredentialError('Invalid email or password');
    }
    const token = generateAuthToken({
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    });
    const refreshToken = generateRefreshToken(user.id);

    return {
      status: 'SUCCESS',
      message: 'User logged in successfully',
      data: {
        token,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
    };
  }
}
