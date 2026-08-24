import { Router } from 'express';
import {
  archiveSupplier,
  createSupplier,
  getSupplier,
  listSuppliers,
  updateSupplier,
} from '../controllers/supplierController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listSuppliers);
router.get('/:slug', getSupplier);
router.post('/', requireAuth, requireAdmin, createSupplier);
router.patch('/:id', requireAuth, requireAdmin, updateSupplier);
router.delete('/:id', requireAuth, requireAdmin, archiveSupplier);

export default router;
