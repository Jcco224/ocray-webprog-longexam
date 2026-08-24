import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Supplier name is required'],
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: [true, 'Supplier slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe'],
    },
    contactPerson: {
      type: String,
      required: [true, 'Contact person is required'],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, 'Supplier email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Supplier phone is required'],
      trim: true,
      maxlength: 30,
    },
    address: {
      type: String,
      required: [true, 'Supplier address is required'],
      trim: true,
      maxlength: 300,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'suppliers' },
);

supplierSchema.index(
  { name: 'text', contactPerson: 'text', address: 'text' },
  { name: 'supplier_text_search' },
);
supplierSchema.index({ isActive: 1, name: 1 }, { name: 'active_suppliers' });

export default mongoose.model('Supplier', supplierSchema);
