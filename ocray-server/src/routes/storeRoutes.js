import { Router } from 'express';
import { getStoreOverview } from '../controllers/storeController.js';

const router = Router();

router.get('/overview', getStoreOverview);

export default router;
