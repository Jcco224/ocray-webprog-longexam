import jwt from 'jsonwebtoken';
import { HttpStatus } from '../config/constants.js';
import User from '../models/userModel.js';
import { authorize } from './authorization.js';

// Authentication module: checks the JWT sent as "Bearer <token>".
export async function requireAuth(req, _res, next) {
  try {
    const header = req.get('authorization') ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      const error = new Error('Authentication required');
      error.status = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.sub);

    if (!user || !user.isActive) {
      const error = new Error('Account is unavailable');
      error.status = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    // Pass the authenticated user to protected controllers and routes.
    req.user = user;
    return next();
  } catch (error) {
    if (!error.status) error.status = HttpStatus.UNAUTHORIZED;
    return next(error);
  }
}

// Reusable admin middleware for protected administrative routes.
export const requireAdmin = authorize('admin');
