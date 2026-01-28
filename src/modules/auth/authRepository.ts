import { PrismaClient, RefreshToken, User } from '@/generated/client';
// import { prisma } from '@/shared/utils/prisma';
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
  // private userModel = prisma.user;
  // private refreshTokenModel = prisma.refreshToken;
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(payload: SignupRequestDTO): Promise<User> {
    return await this.prisma.user.create({
      data: payload,
    });
  }

  async getDataByRefreshToken(token: string): Promise<RefreshToken | null> {
    return await this.prisma.refreshToken.findFirst({
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
    return await this.prisma.refreshToken.create({
      data: payload,
    });
  }

  async revokeRefreshToken(token: string): Promise<RefreshToken> {
    return this.prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true },
    });
  }
}
