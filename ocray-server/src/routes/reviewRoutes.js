import { Router } from 'express';
import {
  approveReview,
  createReview,
  deleteReview,
  listReviews,
  listProductReviews,
  updateReview,
} from '../controllers/reviewController.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireAdmin, listReviews);
router.get('/product/:productId', listProductReviews);
router.post('/', requireAuth, createReview);
router.patch('/:id', requireAuth, updateReview);
router.delete('/:id', requireAuth, deleteReview);
router.patch('/:id/approve', requireAuth, requireAdmin, approveReview);

export default router;
