import { InvalidToken } from '@/modules/auth/authError';
import { NextFunction, Request, Response } from 'express';
import { verifyAuthToken } from '../utils/jwt';

export const checkAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  let authToken = req.headers.authorization;
  if (!authToken) {
    throw new InvalidToken();
  }
  if (authToken && !authToken.startsWith('Bearer ')) {
    throw new InvalidToken();
  }
  const token = authToken.split(' ')[1] as string;
  const decode = verifyAuthToken(token);
  req.user = decode;

  req.user = decode;

  next();
};
