import { NextFunction, Request, Response } from 'express';
import { LoginRequestDTO, SignupRequestDTO } from './authType';
import { AuthService } from './authService';

export class AuthController {
  constructor(private readonly authService: AuthService) {}
  signup = async (
    req: Request<object, object, SignupRequestDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.authService.signup(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request<object, object, LoginRequestDTO>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const response = await this.authService.login(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
