import { HttpStatus } from '../../config/constants.js';
import Category from '../../models/categoryModel.js';
import Product from '../../models/productModel.js';
import Supplier from '../../models/supplierModel.js';

const defaultSort = { isFeatured: -1, createdAt: -1 };
const sortOptions = {
  price: { price: 1 },
  '-price': { price: -1 },
  title: { title: 1 },
  '-title': { title: -1 },
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
};

function exactText(value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^${escaped}$`, 'i');
}

async function findActiveReference(Model, value) {
  return Model.findOne({
    $or: [{ slug: value.toLowerCase() }, { name: exactText(value) }],
    isActive: true,
  });
}

function emptyListResponse(res, page, limit) {
  return res.status(HttpStatus.OK).json({
    success: true,
    message: 'Products retrieved successfully.',
    count: 0,
    data: [],
    pagination: { page, limit, total: 0, pages: 0 },
  });
}

export async function listProducts(req, res) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
  const filter = { isActive: true };

  if (req.query.category) {
    const category = await findActiveReference(Category, req.query.category);
    if (!category) return emptyListResponse(res, page, limit);
    filter.category = category._id;
  }

  if (req.query.supplier) {
    const supplier = await findActiveReference(Supplier, req.query.supplier);
    if (!supplier) return emptyListResponse(res, page, limit);
    filter.supplier = supplier._id;
  }

  if (req.query.availability) filter.availability = req.query.availability;
  if (req.query.featured === 'true') filter.isFeatured = true;
  if (req.query.search?.trim()) filter.$text = { $search: req.query.search.trim() };

  const sort = sortOptions[req.query.sort] ?? defaultSort;
  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name slug')
      .populate('supplier', 'name slug')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  return res.status(HttpStatus.OK).json({
    success: true,
    message: 'Products retrieved successfully.',
    count: products.length,
    data: products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate('category', 'name slug')
    .populate('supplier', 'name slug');
  if (!product) {
    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      message: 'Product not found.',
      count: 0,
      data: null,
    });
  }
  return res.status(HttpStatus.OK).json({
    success: true,
    message: 'Product retrieved successfully.',
    count: 1,
    data: product,
  });
}

export async function createProduct(req, res) {
  const product = await Product.create(req.body);
  await product.populate(['category', 'supplier']);
  return res.status(HttpStatus.CREATED).json({
    success: true,
    message: 'Product created successfully.',
    count: 1,
    data: product,
  });
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate(['category', 'supplier']);
  if (!product) {
    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      message: 'Product not found.',
      count: 0,
      data: null,
    });
  }
  return res.status(HttpStatus.OK).json({
    success: true,
    message: 'Product updated successfully.',
    count: 1,
    data: product,
  });
}

export async function archiveProduct(req, res) {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true, runValidators: true },
  ).populate(['category', 'supplier']);
  if (!product) {
    return res.status(HttpStatus.NOT_FOUND).json({
      success: false,
      message: 'Product not found.',
      count: 0,
      data: null,
    });
  }
  return res.status(HttpStatus.OK).json({
    success: true,
    message: 'Product deleted successfully.',
    count: 1,
    data: product,
  });
}
