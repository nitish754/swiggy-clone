import { AuthController } from './authController';
import { AuthRepository } from './authRepository';
import { AuthService } from './authService';
import { prisma } from '@/shared/utils/prisma';

const AuthRepo = new AuthRepository(prisma);
const authService = new AuthService(AuthRepo);
const authController = new AuthController(authService);

export const SingupHandler = authController.signup;

export const LoginHandler = authController.login;

export const RefreshTokenHandler = authController.refreshToken;
