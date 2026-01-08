import { DuplicateEmail } from './authError';
import { AuthRepository } from './authRepository';
import { SingupRequestDTO } from './authType';
import { SignupResponse } from './authType';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signup(payload: SingupRequestDTO): Promise<SignupResponse | undefined> {
    const existingUser = await this.authRepository.findByEmail(payload.email);
    if (existingUser) {
      throw new DuplicateEmail('Email already exist.');
    }
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
}
