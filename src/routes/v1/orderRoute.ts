import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Example route handlers
router.get('/', (req: Request, res: Response) => {
  res.send('Get all restaurants');
});

export default router;
