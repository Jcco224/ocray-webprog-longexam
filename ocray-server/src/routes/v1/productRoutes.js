import { Router } from 'express';
import {
  archiveProduct,
  createProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../../controllers/v1/productController.js';
import { requireAuth } from '../../middleware/authentication.js';
import { authorize } from '../../middleware/authorization.js';
import { uploadProductImage } from '../../controllers/productController.js';
import uploadImageMiddleware, { validateUploadedImage } from '../../middleware/uploadImageMiddleware.js';

const router = Router();

router.get('/', listProducts);
router.post('/:id/upload-image', requireAuth, authorize('admin'), uploadImageMiddleware.single('image'), validateUploadedImage, uploadProductImage);
router.get('/:slug', getProduct);
router.post('/', requireAuth, authorize('admin'), uploadImageMiddleware.single('image'), validateUploadedImage, createProduct);
router.patch('/:id', requireAuth, authorize('admin'), uploadImageMiddleware.single('image'), validateUploadedImage, updateProduct);
router.delete('/:id', requireAuth, authorize('admin'), archiveProduct);

export default router;
