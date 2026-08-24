import { HttpStatus } from '../config/constants.js';
import Review from '../models/reviewModel.js';

export async function listProductReviews(req, res) {
  const reviews = await Review.find({ product: req.params.productId, isApproved: true })
    .populate('user', 'username firstName lastName')
    .sort({ createdAt: -1 });
  res.json({ success: true, reviews });
}

export async function createReview(req, res) {
  const review = await Review.create({
    user: req.user._id,
    product: req.body.productId,
    rating: req.body.rating,
    comment: req.body.comment,
  });
  res.status(HttpStatus.CREATED).json({ success: true, review });
}

export async function updateReview(req, res) {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Review not found' });
  if (!review.user.equals(req.user._id) && req.user.role !== 'admin') {
    return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: 'You cannot edit this review' });
  }

  if (req.body.rating !== undefined) review.rating = req.body.rating;
  if (req.body.comment !== undefined) review.comment = req.body.comment;
  review.isApproved = req.user.role === 'admin' ? review.isApproved : false;
  await review.save();
  return res.json({ success: true, review });
}

export async function deleteReview(req, res) {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Review not found' });
  if (!review.user.equals(req.user._id) && req.user.role !== 'admin') {
    return res.status(HttpStatus.FORBIDDEN).json({ success: false, message: 'You cannot delete this review' });
  }
  await review.deleteOne();
  return res.json({ success: true, message: 'Review deleted' });
}

export async function approveReview(req, res) {
  const review = await Review.findByIdAndUpdate(
    req.params.id,
    { isApproved: true },
    { new: true, runValidators: true },
  );
  if (!review) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Review not found' });
  return res.json({ success: true, review });
}
