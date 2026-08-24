import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    slug: {
      type: String,
      required: [true, 'Category slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-safe'],
    },
    description: {
      type: String,
      required: [true, 'Category description is required'],
      trim: true,
      maxlength: 500,
    },
    imageKey: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'categories' },
);

// Search categories by keywords and list active categories alphabetically.



categorySchema.index({ name: 'text', description: 'text' }, { name: 'category_text_search' });
categorySchema.index({ isActive: 1, name: 1 }, { name: 'active_categories' });

export default mongoose.model('Category', categorySchema);
