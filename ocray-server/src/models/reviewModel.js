import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    // Referenced documents: identify the review author and reviewed product.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: { validator: Number.isInteger, message: 'Rating must be a whole number' },
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 1000,
    },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true, collection: 'reviews' },
);

// A user may submit only one review for each product.

reviewSchema.index({ user: 1, product: 1 }, { unique: true, name: 'one_review_per_product' });
reviewSchema.index({ product: 1, isApproved: 1, createdAt: -1 }, { name: 'approved_product_reviews' });
reviewSchema.index({ isApproved: 1, createdAt: -1 }, { name: 'review_moderation_queue' });

export default mongoose.model('Review', reviewSchema);
