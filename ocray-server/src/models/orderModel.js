import mongoose from 'mongoose';
import addressSchema from './shared/address.js';

// Embedded snapshot: preserves purchased details if a product changes later.
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    slug: { type: String, required: true },
    title: { type: String, required: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: { validator: Number.isInteger, message: 'Quantity must be a whole number' },
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },

    // Referenced document: one user may own many orders.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item',
      },
    },

    // Embedded snapshot: an old order keeps its original shipping address.
    shippingAddress: { type: addressSchema, required: true },
    subtotal: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'shipped', 'completed', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['cash_on_delivery', 'gcash'],
      default: 'cash_on_delivery',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
  },
  { timestamps: true, collection: 'orders' },
);

// Customer history, fulfillment queues, payment queues, and product sales lookup.


orderSchema.index({ user: 1, createdAt: -1 }, { name: 'orders_by_user' });
orderSchema.index({ status: 1, createdAt: -1 }, { name: 'orders_by_status' });
orderSchema.index({ paymentStatus: 1, createdAt: -1 }, { name: 'orders_by_payment' });
orderSchema.index({ 'items.product': 1, createdAt: -1 }, { name: 'orders_by_product' });

export default mongoose.model('Order', orderSchema);
