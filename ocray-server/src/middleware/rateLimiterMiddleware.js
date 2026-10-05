import rateLimit from 'express-rate-limit';


export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    errorType: 'RateLimitError',
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
});

tyy

