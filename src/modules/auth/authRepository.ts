import { User } from '@/generated/client';
import { prisma } from '@/shared/utils/prisma';
import { SignupRequestDTO } from './authType';

export class AuthRepository {
  private userModel = prisma.user;

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findUnique({
      where: { email },
    });
  }

  async createUser(payload: SignupRequestDTO): Promise<User> {
    return await this.userModel.create({
      data: payload,
    });
  }
}
