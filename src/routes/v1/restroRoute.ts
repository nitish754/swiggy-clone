import { testMiddleware } from '@/middleware/testMiddleware';
import express from 'express';

const router = express.Router();

// Example route handlers
router.get('/', testMiddleware, (req, res) => {
  res.send('Get all restaurants');
});

export default router;
