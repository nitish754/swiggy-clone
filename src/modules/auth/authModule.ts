import { AuthController } from './authController';
import { AuthRepository } from './authRepository';
import { AuthService } from './authService';

const AuthRepo = new AuthRepository();
const authService = new AuthService(AuthRepo);
const authController = new AuthController(authService);

export const SingupHandler = authController.signup;
