import { validateRequest } from '@/shared/middleware/validateRequest';
import { SignupSchema } from './dtos/request/signupSchema';
import { LoginHandler, RefreshTokenHandler, SingupHandler } from './authModule';
import { Router } from 'express';
import { LoginSchema } from './dtos/request/loginSchema';
import { RefreshTokenSchema } from './dtos/request/RefreshTokenSchema';
import { checkAuth } from '@/shared/middleware/checkAuth';

const authRouter = Router();

authRouter.post('/signup', validateRequest(SignupSchema), SingupHandler);
authRouter.post('/login', validateRequest(LoginSchema), LoginHandler);
authRouter.post(
  '/refresh-token',
  validateRequest(RefreshTokenSchema),
  RefreshTokenHandler
);
authRouter.get('/test', checkAuth, (_req, res) => {
  res.json('testing');
});
export default authRouter;
