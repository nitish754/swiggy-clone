import { RefreshToken, User } from '@/generated/client';
import { prisma } from '@/shared/utils/prisma';
import { CreateRefreshTokenType, SignupRequestDTO } from './authType';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  createUser(payload: SignupRequestDTO): Promise<User>;
  getDataByRefreshToken(token: string): Promise<RefreshToken | null>;
  saveRefreshToken(payload: CreateRefreshTokenType): Promise<RefreshToken>;
  revokeRefreshToken(token: string): Promise<RefreshToken>;
}

export class AuthRepository implements IAuthRepository {
  private userModel = prisma.user;
  private refreshTokenModel = prisma.refreshToken;

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userModel.findUnique({
      where: { id },
    });
  }

  async createUser(payload: SignupRequestDTO): Promise<User> {
    return await this.userModel.create({
      data: payload,
    });
  }

  async getDataByRefreshToken(token: string): Promise<RefreshToken | null> {
    return await this.refreshTokenModel.findFirst({
      where: {
        token,
        isRevoked: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  async saveRefreshToken(
    payload: CreateRefreshTokenType
  ): Promise<RefreshToken> {
    return await this.refreshTokenModel.create({
      data: payload,
    });
  }

  async revokeRefreshToken(token: string): Promise<RefreshToken> {
    return await this.refreshTokenModel.delete({
      where: { token },
    });
  }
}
