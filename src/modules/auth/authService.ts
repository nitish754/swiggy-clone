import { AuthRepository } from './authRepository';

export class AuthService {
  private readonly authRepo: AuthRepository;
  constructor() {
    this.authRepo = new AuthRepository();
  }

  private async login() {}
}
