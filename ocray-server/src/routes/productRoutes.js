import { Router } from 'express';
import {
  archiveProduct,
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../controllers/productController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();
router.get('/', listProducts);
router.get('/:slug', getProduct);
router.post('/', requireAuth, requireAdmin, createProduct);
router.patch('/:id', requireAuth, requireAdmin, updateProduct);
router.delete('/:id', requireAuth, requireAdmin, archiveProduct);
export default router;
