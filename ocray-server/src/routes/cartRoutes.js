import { Router } from 'express';
import { addItem, getCart, removeItem, updateItem } from '../controllers/cartController.js';
import { requireAuth } from '../middleware/authentication.js';

const router = Router();
router.use(requireAuth);
router.get('/', getCart);
router.post('/items', addItem);
router.patch('/items/:productId', updateItem);
router.delete('/items/:productId', removeItem);
export default router;
