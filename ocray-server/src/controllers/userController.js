import bcrypt from 'bcryptjs';
import { HttpStatus } from '../config/constants.js';
import User from '../models/userModel.js';

const editableProfileFields = ['firstName', 'lastName', 'address'];
const editableAdminFields = ['firstName', 'lastName', 'role', 'isActive', 'address'];

export function getProfile(req, res) {
  res.json({ success: true, user: req.user });
}

export async function updateProfile(req, res) {
  const updates = {};
  for (const field of editableProfileFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });
  res.json({ success: true, user });
}

// A customer may update only the account that belongs to their JWT token.
export async function updateOwnProfileById(req, res) {
  if (req.user._id.toString() !== req.params.id) {
    return res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      message: 'Forbidden: you can only edit your own profile',
    });
  }

  const updates = {};
  for (const field of editableProfileFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });
  return res.json({ success: true, user });
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Current and new password are required' });
  }
  if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'New password must be at least 8 characters and contain a letter and number',
    });
  }

  const user = await User.findById(req.user._id).select('+passwordHash');
  if (!user || !(await bcrypt.compare(currentPassword, user.passwordHash))) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'Current password is incorrect' });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  await user.save();
  return res.json({ success: true, message: 'Password changed successfully' });
}

export async function listUsers(req, res) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
  const filter = {};
  if (req.query.role) filter.role = req.query.role;
  if (req.query.active !== undefined) filter.isActive = req.query.active === 'true';

  const [users, total] = await Promise.all([
    User.find(filter).sort({ lastName: 1, firstName: 1 }).skip((page - 1) * limit).limit(limit),
    User.countDocuments(filter),
  ]);
  res.json({ success: true, users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

// Admin-only lookup used by the /api/v1/user/:id authorization test.
export async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' });
  return res.json({ success: true, user });
}

export async function updateUserAccess(req, res) {
  const updates = {};
  if (req.body.role !== undefined) updates.role = req.body.role;
  if (req.body.isActive !== undefined) updates.isActive = req.body.isActive;
  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' });
  return res.json({ success: true, user });
}

export async function updateUser(req, res) {
  const updates = {};
  for (const field of editableAdminFields) {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  }
  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'User not found' });
  return res.json({ success: true, user });
}
