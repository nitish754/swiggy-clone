import { AuthTokenPayload } from '@/modules/auth/authType';
import { BadRequest } from '../errors/HttpError';
import jwt, { SignOptions } from 'jsonwebtoken';

export const generateAuthToken = (payload: AuthTokenPayload): string => {
  if (!payload) {
    throw new BadRequest('Invalid payload');
  }

  if (!process.env.JWT_SECRET_KEY || !process.env.TOKEN_EXPIRES_IN) {
    throw new Error('JWT_SECRET_KEY or TOKEN_EXPIRES_IN is not defined');
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
    algorithm: 'HS256',
  } as SignOptions);

  return token;
};

export const generateRefreshToken = (id: number): string => {
  if (
    !process.env.JWT_REFRESH_SECRET_KEY ||
    !process.env.REFRESH_TOKEN_EXPIRES_IN ||
    !id
  ) {
    throw new BadRequest(
      'JWT_REFRESH_SECRET_KEY or REFRESH_TOKEN_EXPIRES_IN or id is not defined'
    );
  }
  const token = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    algorithm: 'HS256',
  } as SignOptions);

  //store refresh token in db

  return token;
};
