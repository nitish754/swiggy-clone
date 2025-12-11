import { Request, Response, Router } from 'express';

const router: Router = Router();

// Example route handlers
router.get('/', (req: Request, res: Response) => {
  res.send('Get cart items');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Add item to cart');
});

export default router;
