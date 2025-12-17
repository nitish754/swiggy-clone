import { Prisma, User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export class AuthRepository {
  private userModel = prisma.user;

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findUnique({
      where: { email },
    });
  }

  async createUser(userPayload: Prisma.UserCreateInput): Promise<User | null> {
    return this.userModel.create({
      data: userPayload,
    });
  }
}
