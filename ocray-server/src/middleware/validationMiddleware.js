
import { HttpStatus } from '../config/constants.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[a-z0-9._-]+$/;

function sendValidationErrors(res, errors) {
  return res.status(HttpStatus.BAD_REQUEST).json({
    success: false,
    errorType: 'ValidationError',
    message: 'Validation failed',
    errors,
  });
}

export function registerValidation(req, res, next) {
  const body = req.body ?? {};
  const errors = [];
  const username = typeof body.username === 'string' ? body.username.trim().toLowerCase() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';

  if (username.length < 3 || username.length > 30 || !usernamePattern.test(username)) {
    errors.push('Username must be 3 to 30 characters and use only lowercase letters, numbers, dots, underscores, or hyphens');
  }
  if (!emailPattern.test(email)) errors.push('Enter a valid email address');
  if (firstName.length < 1 || firstName.length > 60) errors.push('First name must be 1 to 60 characters');
  if (lastName.length < 1 || lastName.length > 60) errors.push('Last name must be 1 to 60 characters');
  if (typeof body.password !== 'string' || body.password.length < 8 || !/[A-Za-z]/.test(body.password) || !/\d/.test(body.password)) {
    errors.push('Password must be at least 8 characters and contain a letter and number');
  }

  if (errors.length) return sendValidationErrors(res, errors);

  // Send normalized values to the controller; never store the plain password.
  req.body = { ...body, username, email, firstName, lastName };
  return next();
}

// Validates login without revealing whether an account exists.
export function loginValidation(req, res, next) {
  const body = req.body ?? {};
  const identifier = body.login ?? body.username;
  const errors = [];

  if (typeof identifier !== 'string' || !identifier.trim()) errors.push('Username or email is required');
  if (typeof body.password !== 'string' || !body.password) errors.push('Password is required');
  if (errors.length) return sendValidationErrors(res, errors);

  req.body = { ...body, login: identifier.trim().toLowerCase() };
  return next();
}

function profileFieldsValidation(req, res, next) {
  const body = req.body ?? {};
  const errors = [];

  for (const field of ['firstName', 'lastName']) {
    if (body[field] !== undefined && (typeof body[field] !== 'string' || !body[field].trim() || body[field].trim().length > 60)) {
      errors.push(`${field} must be a non-empty string with a maximum of 60 characters`);
    }
  }

  if (body.address !== undefined) {
    const address = body.address;
    const requiredAddressFields = ['recipientName', 'phone', 'line1', 'city', 'province', 'postalCode'];
    if (!address || typeof address !== 'object') {
      errors.push('Address must be an object');
    } else {
      for (const field of requiredAddressFields) {
        if (typeof address[field] !== 'string' || !address[field].trim()) errors.push(`Address ${field} is required`);
      }
      if (address.phone && !/^(?:\+63|0)9\d{9}$/.test(address.phone.trim())) errors.push('Enter a valid Philippine mobile number');
      if (address.postalCode && !/^\d{4}$/.test(address.postalCode.trim())) errors.push('Postal code must contain 4 digits');
    }
  }

  if (errors.length) return sendValidationErrors(res, errors);
  return next();
}

export const profileUpdateValidation = profileFieldsValidation;

export function passwordChangeValidation(req, res, next) {
  const body = req.body ?? {};
  const errors = [];
  if (typeof body.currentPassword !== 'string' || !body.currentPassword) errors.push('Current password is required');
  if (typeof body.newPassword !== 'string' || body.newPassword.length < 8 || !/[A-Za-z]/.test(body.newPassword) || !/\d/.test(body.newPassword)) {
    errors.push('New password must be at least 8 characters and contain a letter and number');
  }
  if (errors.length) return sendValidationErrors(res, errors);
  return next();
}

export function adminUserUpdateValidation(req, res, next) {
  const body = req.body ?? {};
  const errors = [];
  if (body.role !== undefined && !['customer', 'admin'].includes(body.role)) errors.push('Role must be customer or admin');
  if (body.isActive !== undefined && typeof body.isActive !== 'boolean') errors.push('isActive must be true or false');
  if (errors.length) return sendValidationErrors(res, errors);
  return profileFieldsValidation(req, res, next);
}

export function userAccessValidation(req, res, next) {
  const body = req.body ?? {};
  const errors = [];
  if (body.role !== undefined && !['customer', 'admin'].includes(body.role)) errors.push('Role must be customer or admin');
  if (body.isActive !== undefined && typeof body.isActive !== 'boolean') errors.push('isActive must be true or false');
  if (body.role === undefined && body.isActive === undefined) errors.push('Provide role or isActive to update user access');
  if (errors.length) return sendValidationErrors(res, errors);
  return next();
}

// Generic pass-through export for future request-specific validators.
export function validationMiddleware(_req, _res, next) {
  return next();
}
