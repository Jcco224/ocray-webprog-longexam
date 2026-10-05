import mongoose from 'mongoose';
import addressSchema from './shared/address.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: [/^[a-z0-9._-]+$/, 'Username contains invalid characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
    },
    passwordHash: { type: String, required: true, select: false },
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },

    // Embedded document: the default address is part of the user profile.
    address: { type: addressSchema, default: undefined },
    isActive: { type: Boolean, default: true },
    failedLoginAttempts: { type: Number, default: 0, min: 0 },
    loginLockedUntil: { type: Date, default: null },
  },
  { timestamps: true, collection: 'users' },
);

// Account administration and alphabetical customer lookup.
userSchema.index({ role: 1, isActive: 1 }, { name: 'active_users_by_role' });
userSchema.index({ lastName: 1, firstName: 1 }, { name: 'users_by_name' });
userSchema.index({ loginLockedUntil: 1 }, { name: 'locked_login_accounts' });

export default mongoose.model('User', userSchema);
