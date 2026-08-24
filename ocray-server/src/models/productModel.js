import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe'],
    },
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    descriptions: {
      type: [{ type: String, trim: true, maxlength: 500 }],
      validate: {
        validator: (items) => items.length > 0,
        message: 'At least one product description is required',
      },
    },

    // Referenced document: many products may share one category.
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product category is required'],
    },
    // Referenced document: products can be filtered by their supplier.
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      default: null,
    },
    price: { type: Number, required: true, min: 0 },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      validate: { validator: Number.isInteger, message: 'Stock must be a whole number' },
    },
    availability: {
      type: String,
      enum: ['in_stock', 'low_stock', 'preorder', 'out_of_stock'],
      default: 'in_stock',
    },
    imageKey: { type: String, required: true, trim: true },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'products' },
);

// Catalog keyword search, filters, sorting, and inventory queries.
productSchema.index({ title: 'text', descriptions: 'text' }, { name: 'product_text_search' });
productSchema.index({ category: 1, isActive: 1, createdAt: -1 }, { name: 'products_by_category' });
productSchema.index({ supplier: 1, isActive: 1, createdAt: -1 }, { name: 'products_by_supplier' });
productSchema.index({ isActive: 1, isFeatured: -1, createdAt: -1 }, { name: 'featured_products' });
productSchema.index({ isActive: 1, price: 1 }, { name: 'products_by_price' });
productSchema.index({ availability: 1, isActive: 1 }, { name: 'products_by_availability' });

export default mongoose.model('Product', productSchema);
