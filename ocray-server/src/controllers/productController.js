import { HttpStatus } from '../config/constants.js';
import mongoose from 'mongoose';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import { normalizeProductInput, productInputWithImage, uploadImageBuffer } from './productImageUpload.js';

export async function uploadProductImage(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Invalid product ID.' });
  }

  if (!req.file) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Choose an image to upload.' });
  }

  const product = await Product.findById(req.params.id);
  if (!product || !product.isActive) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Product not found.' });
  }

  try {
    const result = await uploadImageBuffer(req.file.buffer);

    product.imageKey = result.secure_url;
    product.imagePublicId = result.public_id;
    await product.save();

    return res.status(HttpStatus.OK).json({
      success: true,
      message: 'Product image uploaded successfully.',
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Product image upload failed:', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Image upload failed. Please try again.',
    });
  }
}

export async function listProducts(req, res) {
  const filter = { isActive: true };
  if (req.query.category) {
    const category = await Category.findOne({
      $or: [{ slug: req.query.category.toLowerCase() }, { name: req.query.category }],
      isActive: true,
    });
    if (!category) return res.json({ success: true, products: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } });
    filter.category = category._id;
  }
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.search) filter.$text = { $search: req.query.search };

  const sortOptions = {
    price: { price: 1 },
    '-price': { price: -1 },
    title: { title: 1 },
    '-title': { title: -1 },
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
  };
  const sort = sortOptions[req.query.sort] ?? { isFeatured: -1, createdAt: -1 };

  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
  const [products, total] = await Promise.all([
    Product.find(filter).populate('category', 'name slug').sort(sort).skip((page - 1) * limit).limit(limit),
    Product.countDocuments(filter),
  ]);

  res.json({ success: true, products, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category', 'name slug');
  if (!product) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Product not found' });
  return res.json({ success: true, product });
}

export async function createProduct(req, res) {
  const draft = new Product({
    ...normalizeProductInput(req.body),
    ...(req.file ? { imageKey: 'pending-upload' } : {}),
  });
  await draft.validate();
  const input = await productInputWithImage(req.body, req.file);
  const product = await Product.create(input);
  res.status(HttpStatus.CREATED).json({ success: true, product });
}

export async function updateProduct(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Invalid product ID.' });
  }
  if (!await Product.exists({ _id: req.params.id })) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Product not found' });
  }
  const input = await productInputWithImage(req.body, req.file);
  const product = await Product.findByIdAndUpdate(req.params.id, input, {
    new: true,
    runValidators: true,
  });
  if (!product) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Product not found' });
  return res.json({ success: true, product });
}

export async function archiveProduct(req, res) {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true, runValidators: true },
  );
  if (!product) {
    return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Product not found' });
  }
  return res.status(HttpStatus.OK).json({ success: true, message: 'Product deleted', product });
}
