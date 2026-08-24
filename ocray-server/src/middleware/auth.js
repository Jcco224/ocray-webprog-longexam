import jwt from 'jsonwebtoken';
import { HttpStatus } from '../config/constants.js';
import User from '../models/userModel.js';

export async function requireAuth(req, _res, next) {
  try {
    const header = req.get('authorization') ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      const error = new Error('Authentication required');
      error.status = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      const error = new Error('Account is unavailable');
      error.status = HttpStatus.UNAUTHORIZED;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    if (!error.status) error.status = HttpStatus.UNAUTHORIZED;
    next(error);
  }
}

export function requireAdmin(req, _res, next) {
  if (req.user?.role !== 'admin') {
    const error = new Error('Administrator access required');
    error.status = HttpStatus.FORBIDDEN;
    return next(error);
  }
  return next();
}
