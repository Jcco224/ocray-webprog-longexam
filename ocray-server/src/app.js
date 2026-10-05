import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import './models/index.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import v1ProductRoutes from './routes/v1/productRoutes.js';
import { auditLoggerMiddleware } from './middleware/auditLoggerMiddleware.js';
import { errorHandler, notFound } from './middleware/errors.js';

const app = express();
const corsOptions = {
 
  origin: process.env.CLIENT_ORIGIN?.split(',') ?? 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
};

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  frameguard: { action: 'sameorigin' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));
app.options(/.*/, cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'test' ? 'tiny' : 'dev'));
app.use(auditLoggerMiddleware);

app.get('/api/health', (_req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    success: true,
    service: 'BE Backend',
    database: states[mongoose.connection.readyState] ?? 'unknown',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/debug/server-error', (_req, _res, next) => {
  if (process.env.NODE_ENV === 'production') {
    const error = new Error('Route not found: GET /api/debug/server-error');
    error.status = 404;
    return next(error);
  }
  return next(new Error('Sample server error for error-handling screenshot'));
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/store', storeRoutes);

// Version 1 API routes. Both product spellings are supported because the
// activity examples use singular and plural forms.
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', v1ProductRoutes);
app.use('/api/v1/products', v1ProductRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/supplier', supplierRoutes);
app.use('/api/v1/store', storeRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
