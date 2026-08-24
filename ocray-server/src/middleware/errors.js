import { HttpStatus } from '../config/constants.js';

export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = HttpStatus.NOT_FOUND;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  let status = error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  let message = error.message ?? 'Internal server error';
  let details;

  if (error.name === 'ValidationError') {
    status = HttpStatus.BAD_REQUEST;
    message = 'Validation failed';
    details = Object.values(error.errors).map((item) => item.message);
  } else if (error.code === 11000) {
    status = HttpStatus.CONFLICT;
    message = `${Object.keys(error.keyPattern ?? {})[0] ?? 'Value'} already exists`;
  } else if (error.name === 'CastError') {
    status = HttpStatus.BAD_REQUEST;
    message = `Invalid ${error.path}`;
  }

  res.status(status).json({ success: false, message, ...(details && { details }) });
}
