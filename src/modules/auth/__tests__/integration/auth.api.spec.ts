import app from '@/app';
import {
  LoginResponse,
  RefreshTokenResponse,
  SignupRequestDTO,
  SignupResponse,
} from '../../authType';
import request from 'supertest';
import { AuthRepository } from '../../authRepository';
import { prisma } from '@/shared/utils/prisma';
import { ErrorResponse } from '@/shared/type/response';
import ErrorCode from '@/shared/errors/ErrorCode';

describe('Auth Integration test', () => {
  let authRepo: AuthRepository;
  beforeEach(() => {
    authRepo = new AuthRepository(prisma);
  });
  const payload: SignupRequestDTO = {
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@example.com',
    password: 'password',
    role: 'USER',
  };
  describe('Auth Singup Api Integration testsuit', () => {
    it('should create a user with valid payload', async () => {
      const response = await request(app)
        .post('/api/auth/signup')
        .send(payload);

      expect(response.status).toBe(201);
      const body = response.body as SignupResponse;
      expect(body.status).toBe('SUCCESS');
      expect(body.data.email).toBe(payload.email);
      expect(body.data.role).toBe(payload.role);
      expect(body.data).not.toHaveProperty('password');

      // verify if users exist in db
      const user = await authRepo.findByEmail(payload.email);

      expect(user).toBeDefined();
      expect(user?.email).toBe(payload.email);
      expect(user?.password).not.toBe(payload.password);
    });

    it('should throw validation error with duplicate email', async () => {
      const response1 = await request(app)
        .post('/api/auth/signup')
        .send(payload);

      expect(response1.status).toBe(201);
      expect(response1.body).toHaveProperty('data');

      const response2 = await request(app)
        .post('/api/auth/signup')
        .send(payload);

      const body = response2.body as ErrorResponse;

      console.log(response2.body);

      expect(response2.status).toBe(400);
      expect(body.errors.code).toBe(ErrorCode.BAD_REQUEST);

      // verify in db
      const user = await authRepo.findByEmail(payload.email);
      expect(user?.id).toBe((response1.body as SignupResponse).data.id);
    });

    it('should be ideompotent for duplicate request', async () => {
      const response1 = await request(app)
        .post('/api/auth/signup')
        .send(payload);
      expect(response1.status).toBe(201);
      const response2 = await request(app)
        .post('/api/auth/signup')
        .send(payload);
      expect(response2.status).toBe(400);
    });

    // it('should handle the race condition for parallel signup request', async () => {
    //   const results = await Promise.allSettled([
    //     request(app).post('/api/auth/signup').send(payload),
    //     request(app).post('/api/auth/signup').send(payload),
    //   ]);

    //   const responses: Response[] = results
    //     .filter(
    //       (r): r is PromiseFulfilledResult<Response> => r.status === 'fulfilled'
    //     )
    //     .map((r) => r.value);

    //   console.log(responses);

    //   const successResponses = responses.filter((res) => res.status === 201);
    //   const failedResponses = responses.filter((res) => res.status === 400);

    //   expect(successResponses).toHaveLength(1);
    //   expect(failedResponses).toHaveLength(1);

    //   const users = await prisma.user.findMany({
    //     where: { email: payload.email },
    //   });

    //   expect(users).toHaveLength(1);
    //   // await prisma.user.deleteMany();
    // });
  });

  describe('Auth Login API integration testsuite', () => {
    it('should login with valid email & password', async () => {
      const user = await request(app).post('/api/auth/signup').send(payload);
      expect(user.status).toBe(201);
      expect((user.body as SignupResponse).data.email).toBe(payload.email);
      const response = await request(app).post('/api/auth/login').send({
        email: payload.email,
        password: payload.password,
        device: 'WEB',
      });
      expect(response.status).toBe(200);
      const body = response.body as LoginResponse;
      console.log('Login', body);
      expect(body.status).toBe('SUCCESS');
      expect(body.data).toHaveProperty('token');
      expect(body.data).toHaveProperty('refreshToken');
      expect(body.data.token).toBeDefined();
      expect(body.data.token).not.toBe('');
      expect(body.data.refreshToken).toBeDefined();
      expect(body.data.refreshToken).not.toBe('');
      expect(body.data.user).toMatchObject(
        expect.objectContaining({
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
          role: payload.role,
        })
      );
    });

    it('should throw Invalid credential error with Invalid credentials', async () => {
      const user = await request(app).post('/api/auth/signup').send(payload);

      expect(user.status).toBe(201);
      expect((user.body as SignupResponse).data.email).toBe(payload.email);

      const response = await request(app).post('/api/auth/login').send({
        email: payload.email,
        password: 'password123',
        device: 'WEB',
      });

      expect(response.status).toBe(400);
      expect((response.body as ErrorResponse).status).toBe('FAILED');
      expect((response.body as ErrorResponse).errors.code).toBe(
        ErrorCode.AUTH_INVALID_CREDENTIALS
      );
    });
  });

  describe('Auth Refresh Token API integration testsuit', () => {
    it('should generate new access token by passing refreshtoken', async () => {
      const user = await request(app).post('/api/auth/signup').send(payload);
      expect(user.status).toBe(201);
      const loginResponse = await request(app).post('/api/auth/login').send({
        email: payload.email,
        password: payload.password,
        device: 'WEB',
      });
      expect(loginResponse.status).toBe(200);
      expect((loginResponse.body as LoginResponse).data.token).toBeDefined();
      expect(
        (loginResponse.body as LoginResponse).data.refreshToken
      ).toBeDefined();

      // exchange the refresh token to get new token
      const newTokenRes = await request(app)
        .post('/api/auth/refresh-token')
        .send({
          refreshToken: (loginResponse.body as LoginResponse).data.refreshToken,
        });

      expect(newTokenRes.status).toBe(200);
      expect((newTokenRes.body as RefreshTokenResponse).status).toBe('SUCCESS');
      expect(
        (newTokenRes.body as RefreshTokenResponse).data.refreshToken
      ).toBeDefined();
      expect(
        (newTokenRes.body as RefreshTokenResponse).data.token
      ).toBeDefined();

      // make sure if old refresh token must be revoked
      const refreshToken = await prisma.refreshToken.findFirst({
        where: {
          token: (loginResponse.body as LoginResponse).data.refreshToken,
        },
      });
      expect(refreshToken?.isRevoked).toBe(true);
    });
  });
});
