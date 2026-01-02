import { validateRequest } from '@/shared/middleware/validateRequest';
import { Router } from 'express';
import { SignupSchema } from './dtos/request/signupSchema';

const authRouter = Router();

authRouter.post('/signup', validateRequest(SignupSchema), () => {});

export default authRouter;
