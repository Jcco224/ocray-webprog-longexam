import { HttpStatus } from '../config/constants.js';

export function authorize(...roles) {
  return (req, _res, next) => {
    try {
      if (!req.user?.role || !roles.includes(req.user.role)) {
        const error = new Error('Access denied');
        error.status = HttpStatus.FORBIDDEN;
        return next(error);
      }

      return next();
    } catch (error) {
      error.status = HttpStatus.FORBIDDEN;
      return next(error);
    }
  };
}
