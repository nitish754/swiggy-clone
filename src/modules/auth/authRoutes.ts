import { validateRequest } from '@/shared/middleware/validateRequest';
import { SignupSchema } from './dtos/request/signupSchema';
import { LoginHandler, SingupHandler } from './authModule';
import { Router } from 'express';
import { LoginSchema } from './dtos/request/loginSchema';

const authRouter = Router();

authRouter.post('/signup', validateRequest(SignupSchema), SingupHandler);
authRouter.post('/login', validateRequest(LoginSchema), LoginHandler);
export default authRouter;
