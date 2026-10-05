import { HttpStatus } from '../config/constants.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

const populateCart = (query) => query.populate('items.product', 'slug title price stockQuantity availability imageKey isActive');

export async function getCart(req, res) {
  const cart = await populateCart(Cart.findOneAndUpdate(
    { user: req.user._id },
    { $setOnInsert: { user: req.user._id, items: [] } },
    { new: true, upsert: true, runValidators: true },
  ));
  res.json({ success: true, cart });
}

export async function addItem(req, res) {
  const quantity = Number(req.body.quantity ?? 1);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Quantity must be an integer from 1 to 99' });
  }

  const product = await Product.findOne({ _id: req.body.productId, isActive: true, availability: { $ne: 'out_of_stock' } });
  if (!product) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Product not found' });
  if (product.availability !== 'preorder' && product.stockQuantity < quantity) {
    return res.status(HttpStatus.CONFLICT).json({ success: false, message: 'Requested quantity is unavailable' });
  }

  const cart = await Cart.findOne({ user: req.user._id }) ?? new Cart({ user: req.user._id });
  const item = cart.items.find((entry) => entry.product.equals(product._id));
  if (item) item.quantity = Math.min(item.quantity + quantity, 99);
  else cart.items.push({ product: product._id, quantity });
  await cart.save();
  await cart.populate('items.product', 'slug title price stockQuantity availability imageKey isActive');
  return res.status(HttpStatus.CREATED).json({ success: true, cart });
}

export async function updateItem(req, res) {
  const quantity = Number(req.body.quantity);
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Quantity must be an integer from 1 to 99' });
  }
  const cart = await Cart.findOne({ user: req.user._id });
  const item = cart?.items.find((entry) => entry.product.equals(req.params.productId));
  if (!item) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Cart item not found' });
  item.quantity = quantity;
  await cart.save();
  await cart.populate('items.product', 'slug title price stockQuantity availability imageKey isActive');
  return res.json({ success: true, cart });
}

export async function removeItem(req, res) {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: req.params.productId } } },
    { new: true },
  ).populate('items.product', 'slug title price stockQuantity availability imageKey isActive');
  if (!cart) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Cart not found' });
  return res.json({ success: true, cart });
}
