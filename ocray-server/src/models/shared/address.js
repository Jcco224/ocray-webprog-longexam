import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    recipientName: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, match: [/^(?:\+63|0)9\d{9}$/, 'Enter a valid Philippine mobile number'] },
    line1: { type: String, required: true, trim: true, maxlength: 150 },
    line2: { type: String, trim: true, maxlength: 150, default: '' },
    city: { type: String, required: true, trim: true, maxlength: 80 },
    province: { type: String, required: true, trim: true, maxlength: 80 },
    postalCode: { type: String, required: true, trim: true, match: [/^\d{4}$/, 'Postal code must contain 4 digits'] },
  },
  { _id: false },
);

export default addressSchema;
