import { Router } from 'express';
import {
  archiveSupplier,
  createSupplier,
  getSupplier,
  listSuppliers,
  updateSupplier,
} from '../controllers/supplierController.js';
import { requireAuth } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorization.js';

const router = Router();

router.get('/', listSuppliers);
router.get('/:slug', getSupplier);
router.post('/', requireAuth, authorize('admin'), createSupplier);
router.patch('/:id', requireAuth, authorize('admin'), updateSupplier);
router.delete('/:id', requireAuth, authorize('admin'), archiveSupplier);

export default router;
