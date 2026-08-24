import { Router } from 'express';
import {
  getProfile,
  listUsers,
  updateProfile,
  updateUserAccess,
} from '../controllers/userController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.patch('/me', requireAuth, updateProfile);
router.get('/', requireAuth, requireAdmin, listUsers);
router.patch('/:id/access', requireAuth, requireAdmin, updateUserAccess);

export default router;
