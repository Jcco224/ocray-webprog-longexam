import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../config/constants.js';
import User from '../models/userModel.js';

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
}

function createToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  });
}

export async function register(req, res) {
  const { username, email, password, firstName, lastName } = req.body ?? {};
  if (!username || !email || !password || !firstName || !lastName) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'All registration fields are required' });
  }
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Password must be at least 8 characters and contain a letter and number',
    });
  }

  const user = await User.create({
    username,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    firstName,
    lastName,
  });

  return res.status(HttpStatus.CREATED).json({ success: true, token: createToken(user), user: publicUser(user) });
}

export async function login(req, res) {
  const { login: loginValue, username, password } = req.body ?? {};
  const identifier = (loginValue ?? username ?? '').trim().toLowerCase();
  if (!identifier || !password) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Username/email and password are required' });
  }

  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  }).select('+passwordHash');

  if (!user || !user.isActive || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'Invalid username/email or password' });
  }

  return res.json({ success: true, token: createToken(user), user: publicUser(user) });
}

export function me(req, res) {
  return res.json({ success: true, user: publicUser(req.user) });
}
