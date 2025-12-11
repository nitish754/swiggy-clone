import { Request, Response, Router } from 'express';

const router: Router = Router();

// Example route handlers
router.post('/login', (req: Request, res: Response) => {
  res.send('User login');
});

router.post('/register', (req, res) => {
  res.send('User registration');
});

export default router;
