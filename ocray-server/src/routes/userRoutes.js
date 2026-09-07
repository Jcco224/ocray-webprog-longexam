import { Router } from 'express';
import {
  getProfile,
  listUsers,
  changePassword,
  updateProfile,
  updateUser,
  updateUserAccess,
} from '../controllers/userController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.patch('/me', requireAuth, updateProfile);
router.patch('/me/password', requireAuth, changePassword);
router.get('/', requireAuth, requireAdmin, listUsers);
router.patch('/:id', requireAuth, requireAdmin, updateUser);
router.patch('/:id/access', requireAuth, requireAdmin, updateUserAccess);

export default router;
