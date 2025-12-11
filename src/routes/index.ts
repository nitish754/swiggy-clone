import { Router } from 'express';
import restroRoute from './v1/restroRoute';
import authRoute from './v1/authRoute';
import cartRoute from './v1/cartRoute';
import orderRoute from './v1/orderRoute';

const router = Router();

router.use('/v1/restaurants', restroRoute);
router.use('/v1/auth', authRoute);
router.use('/v1/cart', cartRoute);
router.use('/v1/orders', orderRoute);

export default router;
