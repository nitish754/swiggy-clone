import {
  DuplicateEmail,
  InvalidCredentialError,
  InvalidToken,
} from './authError';
import { IAuthRepository } from './authRepository';
import {
  LoginRequestDTO,
  LoginResponse,
  RefreshTokenRequestDTO,
  RefreshTokenResponse,
  SignupRequestDTO,
} from './authType';
import { SignupResponse } from './authType';
import * as bcrypt from 'bcrypt';
import { generateAuthToken, generateRefreshToken } from '@/shared/utils/jwt';
import moment from 'moment';

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

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
      throw new InvalidCredentialError('Invalid email or password');
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
    const refreshToken = generateRefreshToken();

    // save token in DB
    await this.authRepository.saveRefreshToken({
      device: 'WEB',
      userId: user.id,
      expiresAt: moment().add(1, 'd').toDate(),
      token: refreshToken,
    });

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

  async refreshToken(
    payload: RefreshTokenRequestDTO
  ): Promise<RefreshTokenResponse> {
    const refreshToken = await this.authRepository.getDataByRefreshToken(
      payload.refreshToken
    );
    if (!refreshToken) {
      throw new InvalidToken();
    }

    const user = await this.authRepository.findById(refreshToken.userId);

    if (!user) {
      throw new InvalidToken();
    }

    // revoke or delete previous stored refresh token
    await this.authRepository.revokeRefreshToken(payload.refreshToken);
    // now generate new auth token
    const token = generateAuthToken({
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    });

    const refToken = generateRefreshToken();

    // save in db
    await this.authRepository.saveRefreshToken({
      device: 'WEB',
      userId: user.id,
      expiresAt: moment().add(1, 'd').toDate(),
      token: refToken,
    });

    return {
      status: 'SUCCESS',
      message: 'token generated successfully',
      data: {
        token: token,
        refreshToken: refToken,
      },
    };
  }
}
