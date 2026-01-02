import { User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export class AuthRepository {
  private userModel = prisma.user;

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findUnique({
      where: { email },
    });
  }
}
