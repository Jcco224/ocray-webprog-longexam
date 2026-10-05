import { Router } from 'express';
import {
  getProfile,
  getUserById,
  listUsers,
  changePassword,
  updateOwnProfileById,
  updateProfile,
  updateUser,
  updateUserAccess,
} from '../controllers/userController.js';
import { requireAuth } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorization.js';
import {
  adminUserUpdateValidation,
  passwordChangeValidation,
  profileUpdateValidation,
  userAccessValidation,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.get('/me', requireAuth, getProfile);
router.patch('/me', requireAuth, profileUpdateValidation, updateProfile);
router.patch('/me/password', requireAuth, passwordChangeValidation, changePassword);
router.patch('/:id/self', requireAuth, profileUpdateValidation, updateOwnProfileById);
router.get('/', requireAuth, authorize('admin'), listUsers);
router.get('/:id', requireAuth, authorize('admin'), getUserById);
router.patch('/:id', requireAuth, authorize('admin'), adminUserUpdateValidation, updateUser);
router.patch('/:id/access', requireAuth, authorize('admin'), userAccessValidation, updateUserAccess);

export default router;
