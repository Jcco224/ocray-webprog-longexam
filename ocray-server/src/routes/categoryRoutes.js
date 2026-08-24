import { Router } from 'express';
import {
  archiveCategory,
  createCategory,
  getCategory,
  listCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listCategories);
router.get('/:slug', getCategory);
router.post('/', requireAuth, requireAdmin, createCategory);
router.patch('/:id', requireAuth, requireAdmin, updateCategory);
router.delete('/:id', requireAuth, requireAdmin, archiveCategory);

export default router;
