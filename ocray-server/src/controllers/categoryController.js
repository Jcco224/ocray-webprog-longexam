import { HttpStatus } from '../config/constants.js';
import Category from '../models/categoryModel.js';

export async function listCategories(_req, res) {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  res.json({ success: true, categories });
}

export async function getCategory(req, res) {
  const category = await Category.findOne({ slug: req.params.slug, isActive: true });
  if (!category) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Category not found' });
  return res.json({ success: true, category });
}

export async function createCategory(req, res) {
  const category = await Category.create(req.body);
  res.status(HttpStatus.CREATED).json({ success: true, category });
}

export async function updateCategory(req, res) {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Category not found' });
  return res.json({ success: true, category });
}

export async function archiveCategory(req, res) {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true, runValidators: true },
  );
  if (!category) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Category not found' });
  return res.json({ success: true, message: 'Category archived', category });
}
