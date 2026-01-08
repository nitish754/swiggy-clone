import { validateRequest } from '@/shared/middleware/validateRequest';
import { SignupSchema } from './dtos/request/signupSchema';
import { SingupHandler } from './authModule';
import { Router } from 'express';

const authRouter = Router();

authRouter.post('/signup', validateRequest(SignupSchema), SingupHandler);
export default authRouter;
