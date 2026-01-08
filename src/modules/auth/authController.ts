import { NextFunction, Request, Response } from 'express';
import { SingupRequestDTO } from './authType';
import { AuthService } from './authService';
// import { BaseError } from '@/shared/errors/BaseError';

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  signup = async (
    req: Request<object, object, SingupRequestDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log('Signup request body:', req.body);
      const response = await this.authService.signup(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };
}
