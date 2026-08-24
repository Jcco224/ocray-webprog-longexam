import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import Cart from '../models/cartModel.js';
import Category from '../models/categoryModel.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

let mongod;

async function verify() {
  process.env.NODE_ENV = 'test';
  mongod = await MongoMemoryServer.create();
  await connectDatabase(mongod.getUri('bulldogs_exchange_verification'));
  await Promise.all([
    User.syncIndexes(),
    Category.syncIndexes(),
    Product.syncIndexes(),
    Cart.syncIndexes(),
    Order.syncIndexes(),
    Review.syncIndexes(),
  ]);

  const user = await User.create({
    username: 'sample.bulldog',
    email: 'sample@national-u.edu.ph',
    passwordHash: await bcrypt.hash('Bulldog123', 4),
    firstName: 'Sample',
    lastName: 'Student',
  });
  const category = await Category.create({
    name: 'Apparel',
    slug: 'apparel',
    description: 'Official Bulldogs Exchange apparel.',
  });
  const product = await Product.create({
    slug: 'verification-shirt',
    title: 'Verification Shirt',
    descriptions: ['A sample document used to verify the database design.'],
    category: category._id,
    price: 699,
    stockQuantity: 10,
    availability: 'in_stock',
    imageKey: 'NUshirt.webp',
  });
  const cart = await Cart.create({ user: user._id, items: [{ product: product._id, quantity: 2 }] });
  const populatedCart = await Cart.findById(cart._id).populate('user', 'username').populate('items.product', 'slug price');
  const order = await Order.create({
    orderNumber: 'BDX-VERIFY-001',
    user: user._id,
    items: [{ product: product._id, slug: product.slug, title: product.title, unitPrice: product.price, quantity: 2 }],
    shippingAddress: {
      recipientName: 'Sample Student',
      phone: '09171234567',
      line1: '551 M. F. Jhocson Street',
      city: 'Manila',
      province: 'Metro Manila',
      postalCode: '1008',
    },
    subtotal: 1398,
  });
  const review = await Review.create({
    user: user._id,
    product: product._id,
    rating: 5,
    comment: 'The sample product relationship works correctly.',
    isApproved: true,
  });

  let validationRejected = false;
  try {
    await Product.create({ slug: 'invalid-product', title: 'Invalid', descriptions: ['Invalid'], category: category._id, price: -1, stockQuantity: -1, imageKey: 'none' });
  } catch (error) {
    validationRejected = error.name === 'ValidationError';
  }

  if (populatedCart.user.username !== user.username || populatedCart.items[0].product.slug !== product.slug) {
    throw new Error('Referenced user/product relationships did not populate correctly');
  }
  if (order.shippingAddress.city !== 'Manila' || order.items[0].title !== product.title) {
    throw new Error('Embedded order documents were not retained correctly');
  }
  const populatedProduct = await Product.findById(product._id).populate('category', 'slug');
  const populatedReview = await Review.findById(review._id).populate('user', 'username').populate('product', 'slug');
  if (populatedProduct.category.slug !== category.slug || populatedReview.user.username !== user.username || populatedReview.product.slug !== product.slug) {
    throw new Error('Category/review references did not populate correctly');
  }
  if (!validationRejected) throw new Error('Schema validation did not reject invalid values');

  const counts = {
    users: await User.countDocuments(),
    categories: await Category.countDocuments(),
    products: await Product.countDocuments(),
    carts: await Cart.countDocuments(),
    orders: await Order.countDocuments(),
    reviews: await Review.countDocuments(),
  };
  const indexes = {
    users: (await User.collection.indexes()).length,
    categories: (await Category.collection.indexes()).length,
    products: (await Product.collection.indexes()).length,
    carts: (await Cart.collection.indexes()).length,
    orders: (await Order.collection.indexes()).length,
    reviews: (await Review.collection.indexes()).length,
  };

  console.log('Schema validation: PASS');
  console.log('Embedded documents: PASS');
  console.log('Referenced documents/populate: PASS');
  console.log('Sample documents:', counts);
  console.log('Collection indexes:', indexes);
  console.log(`MongoDB ready state: ${mongoose.connection.readyState} (connected)`);
}

verify()
  .then(async () => {
    await disconnectDatabase();
    await mongod.stop();
  })
  .catch(async (error) => {
    console.error('Verification failed:', error);
    await disconnectDatabase();
    if (mongod) await mongod.stop();
    process.exitCode = 1;
  });
