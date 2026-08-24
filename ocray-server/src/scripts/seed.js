import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { productSeeds } from '../data/products.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

async function seed() {
  await connectDatabase();
  for (const product of productSeeds) {
    const categorySlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await Category.findOneAndUpdate(
      { slug: categorySlug },
      {
        name: product.category,
        slug: categorySlug,
        description: `${product.category} products available from Bulldogs Exchange.`,
        isActive: true,
      },
      { upsert: true, new: true, runValidators: true },
    );
    await Product.findOneAndUpdate(
      { slug: product.slug },
      { ...product, category: category._id },
      { upsert: true, runValidators: true },
    );
  }

  if (process.env.SEED_ADMIN_PASSWORD) {
    await User.findOneAndUpdate(
      { username: 'bulldogadmin' },
      {
        username: 'bulldogadmin',
        email: 'ocray@admin.com',
        passwordHash: await bcrypt.hash(process.env.SEED_ADMIN_PASSWORD, 12),
        firstName: 'BulldogEx',
        lastName: 'Administrator',
        role: 'admin',
      },
      { upsert: true, runValidators: true },
    );
  }

  console.log(`Seed complete: ${productSeeds.length} products, ${await Category.countDocuments()} categories${process.env.SEED_ADMIN_PASSWORD ? ', and one admin' : ''}`);
}

seed()
  .then(disconnectDatabase)
  .catch(async (error) => {
    console.error(error);
    await disconnectDatabase();
    process.exitCode = 1;
  });
