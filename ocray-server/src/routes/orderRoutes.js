import { Router } from 'express';
import { createOrder, getMyOrder, listMyOrders } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', listMyOrders);
router.get('/:id', getMyOrder);
router.post('/', createOrder);
export default router;
