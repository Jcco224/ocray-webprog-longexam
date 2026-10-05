import { Router } from 'express';
import { createOrder, getMyOrder, listMyOrders, listOrders, updateOrderStatus } from '../controllers/orderController.js';
import { requireAuth } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorization.js';

const router = Router();
router.use(requireAuth);
router.get('/admin/all', authorize('admin'), listOrders);
router.get('/', listMyOrders);
router.get('/:id', getMyOrder);
router.post('/', createOrder);
router.patch('/:id/status', authorize('admin'), updateOrderStatus);
export default router;
