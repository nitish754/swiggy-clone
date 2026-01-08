import { Request, Response, Router } from 'express';
import authRouter from '@/modules/auth/authRoutes';
import { prisma } from '@/shared/utils/prisma';

const router = Router();

router.use('/auth', authRouter);
router.get('/test', async (req: Request, res: Response) => {
  try {
    await prisma.user.create({
      data: {
        firstName: 'Mark',
        lastName: 'Zuckerberg',
        email: 'mark.zuckerberg@example.com',
        password: 'securepassword',
        role: 'ADMIN',
      },
    });

    res.send('Test user created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating test user');
  }
});

export default router;
