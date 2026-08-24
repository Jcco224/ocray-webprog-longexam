import { HttpStatus } from '../config/constants.js';
import User from '../models/userModel.js';

const editableProfileFields = ['firstName', 'lastName', 'address'];

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
