import { Router } from 'express';
import {
  approveReview,
  createReview,
  deleteReview,
  listReviews,
  listProductReviews,
  updateReview,
} from '../controllers/reviewController.js';
import { requireAuth } from '../middleware/authentication.js';
import { authorize } from '../middleware/authorization.js';

const router = Router();

router.get('/', requireAuth, authorize('admin'), listReviews);
router.get('/product/:productId', listProductReviews);
router.post('/', requireAuth, createReview);
router.patch('/:id', requireAuth, updateReview);
router.delete('/:id', requireAuth, deleteReview);
router.patch('/:id/approve', requireAuth, authorize('admin'), approveReview);

export default router;
