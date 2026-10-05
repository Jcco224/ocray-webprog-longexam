import { Router } from 'express';
import {
  archiveCategory,
  createCategory,
  getCategory,
  listCategories,
  updateCategory,
} from '../controllers/categoryController.js';
import { requireAuth } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorization.js';

const router = Router();

router.get('/', listCategories);
router.get('/:slug', getCategory);
router.post('/', requireAuth, authorize('admin'), createCategory);
router.patch('/:id', requireAuth, authorize('admin'), updateCategory);
router.delete('/:id', requireAuth, authorize('admin'), archiveCategory);

export default router;
