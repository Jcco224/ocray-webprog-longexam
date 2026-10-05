import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authentication.js';
import { loginLimiter } from '../middleware/rateLimiterMiddleware.js';
import { loginValidation, registerValidation } from '../middleware/validationMiddleware.js';

const router = Router();
router.post('/register', registerValidation, register);
router.post('/login', loginLimiter, loginValidation, login);
router.get('/me', requireAuth, me);
export default router;
