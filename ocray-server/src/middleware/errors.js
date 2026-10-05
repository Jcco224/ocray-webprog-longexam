import { HttpStatus } from '../config/constants.js';

export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = HttpStatus.NOT_FOUND;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  let status = error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
  let message = error.message ?? 'Internal server error';
  let errorType = 'ServerError';
  let details;

  if (error.name === 'ValidationError') {
    status = HttpStatus.BAD_REQUEST;
    message = 'Validation failed';
    errorType = 'ValidationError';
    details = Object.values(error.errors).map((item) => item.message);
  } else if (error.name === 'MulterError') {
    status = error.code === 'LIMIT_FILE_SIZE' ? 413 : HttpStatus.BAD_REQUEST;
    message = error.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller.' : error.message;
    errorType = 'ValidationError';
  } else if (error.code === 11000) {
    status = HttpStatus.CONFLICT;
    message = `${Object.keys(error.keyPattern ?? {})[0] ?? 'Value'} already exists`;
    errorType = 'DuplicateValueError';
  } else if (error.name === 'CastError') {
    status = HttpStatus.BAD_REQUEST;
    message = `Invalid ${error.path}`;
    errorType = 'ValidationError';
  } else if (error.type === 'entity.parse.failed') {
    status = HttpStatus.BAD_REQUEST;
    message = 'Invalid JSON request body';
    errorType = 'ValidationError';
  } else if (status === HttpStatus.BAD_REQUEST) {
    errorType = 'ValidationError';
  } else if (status === HttpStatus.UNAUTHORIZED) {
    errorType = 'AuthenticationError';
  } else if (status === HttpStatus.FORBIDDEN) {
    errorType = 'AuthorizationError';
  } else if (status === HttpStatus.NOT_FOUND) {
    errorType = 'NotFoundError';
  }

  res.status(status).json({ success: false, errorType, message, ...(details && { details }) });
}
