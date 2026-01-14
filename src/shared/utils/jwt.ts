import {
  AuthTokenPayload,
  CreateAuthTokenPayload,
} from '@/modules/auth/authType';
import { BadRequest } from '../errors/HttpError';
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'node:crypto';
import { InvalidToken } from '@/modules/auth/authError';

export const generateAuthToken = (payload: CreateAuthTokenPayload): string => {
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

export const generateRefreshToken = (): string => {
  const token = crypto.randomBytes(64).toString('hex');

  return token;
};

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined');
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (typeof decode === 'string') {
    throw new InvalidToken();
  }
  return decode as AuthTokenPayload;
};
