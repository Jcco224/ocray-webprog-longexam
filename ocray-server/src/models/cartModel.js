import mongoose from 'mongoose';

// Embedded document: each cart item belongs only to its parent cart.
const cartItemSchema = new mongoose.Schema(
  {
    // Referenced document: connects the item to its current product.
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
      validate: { validator: Number.isInteger, message: 'Quantity must be a whole number' },
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    // Referenced document: one cart belongs to one user.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true, collection: 'carts' },
);

// `unique: true` on user creates the frequently used cart-by-user index.

export default mongoose.model('Cart', cartSchema);
