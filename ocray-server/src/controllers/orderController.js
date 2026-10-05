import crypto from 'node:crypto';
import { HttpStatus } from '../config/constants.js';
import Cart from '../models/cartModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export async function createOrder(req, res) {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart?.items.length) return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Cart is empty' });

  const unavailable = cart.items.find(({ product, quantity }) => (
    !product?.isActive
    || product.availability === 'out_of_stock'
    || (product.availability !== 'preorder' && product.stockQuantity < quantity)
  ));
  if (unavailable) return res.status(HttpStatus.CONFLICT).json({ success: false, message: 'A cart item is unavailable' });

  const items = cart.items.map(({ product, quantity }) => ({
    product: product._id,
    slug: product.slug,
    title: product.title,
    unitPrice: product.price,
    quantity,
  }));
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const reducedProducts = [];

  try {
    // Deduct physical stock only when the customer creates an order.
    // Preorder items are not deducted because they do not use on-hand inventory.
    for (const { product, quantity } of cart.items) {
      if (product.availability === 'preorder') continue;

      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: product._id,
          isActive: true,
          availability: { $ne: 'out_of_stock' },
          stockQuantity: { $gte: quantity },
        },
        [
          {
            $set: {
              stockQuantity: { $subtract: ['$stockQuantity', quantity] },
              availability: {
                $cond: [
                  { $eq: [{ $subtract: ['$stockQuantity', quantity] }, 0] },
                  'out_of_stock',
                  '$availability',
                ],
              },
            },
          },
        ],
        { new: true },
      );

      if (!updatedProduct) {
        const error = new Error('A cart item is no longer available');
        error.status = HttpStatus.CONFLICT;
        throw error;
      }
      reducedProducts.push({ productId: product._id, quantity, previousAvailability: product.availability });
    }

    const order = await Order.create({
      orderNumber: `BDX-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      user: req.user._id,
      items,
      shippingAddress: req.body.shippingAddress,
      subtotal,
      paymentMethod: req.body.paymentMethod,
    });
    cart.items = [];
    await cart.save();
    return res.status(HttpStatus.CREATED).json({ success: true, order });
  } catch (error) {
    // If order creation fails after a deduction, restore the affected stock.
    await Promise.all(reducedProducts.map(({ productId, quantity, previousAvailability }) => Product.findByIdAndUpdate(
      productId,
      { $inc: { stockQuantity: quantity }, $set: { availability: previousAvailability } },
    )));
    if (!error.status) error.status = HttpStatus.INTERNAL_SERVER_ERROR;
    throw error;
  }
}

export async function listMyOrders(req, res) {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
}

export async function getMyOrder(req, res) {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
  if (!order) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Order not found' });
  return res.json({ success: true, order });
}

export async function listOrders(req, res) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 20, 1), 100);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;

  const [orders, total] = await Promise.all([
    Order.find(filter)
      .populate('user', 'username email firstName lastName')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Order.countDocuments(filter),
  ]);

  return res.json({ success: true, orders, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}

export async function updateOrderStatus(req, res) {
  const allowedStatuses = ['pending', 'confirmed', 'preparing', 'ready_for_claiming', 'completed', 'cancelled'];
  if (!allowedStatuses.includes(req.body.status)) {
    return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: 'Invalid order status' });
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true },
  ).populate('user', 'username email firstName lastName');

  if (!order) return res.status(HttpStatus.NOT_FOUND).json({ success: false, message: 'Order not found' });
  return res.json({ success: true, order });
}
