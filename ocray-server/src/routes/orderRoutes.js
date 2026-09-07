import { Router } from 'express';
import { createOrder, getMyOrder, listMyOrders, listOrders, updateOrderStatus } from '../controllers/orderController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/admin/all', requireAdmin, listOrders);
router.get('/', listMyOrders);
router.get('/:id', getMyOrder);
router.post('/', createOrder);
router.patch('/:id/status', requireAdmin, updateOrderStatus);
export default router;
