import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import Supplier from '../models/supplierModel.js';

async function seedPart7() {
  await connectDatabase();

  const uniform = await Category.findOneAndUpdate(
    { slug: 'uniform' },
    {
      name: 'Uniform',
      slug: 'uniform',
      description: 'Official school uniforms and campus apparel.',
      isActive: true,
    },
    { upsert: true, new: true, runValidators: true },
  );

  const nike = await Supplier.findOneAndUpdate(
    { slug: 'nike' },
    {
      name: 'Nike',
      slug: 'nike',
      contactPerson: 'Jordan Reyes',
      email: 'nike.supplier@example.com',
      phone: '09170000001',
      address: 'Metro Manila, Philippines',
      isActive: true,
    },
    { upsert: true, new: true, runValidators: true },
  );

  const adidas = await Supplier.findOneAndUpdate(
    { slug: 'adidas' },
    {
      name: 'Adidas',
      slug: 'adidas',
      contactPerson: 'Taylor Cruz',
      email: 'adidas.supplier@example.com',
      phone: '09170000002',
      address: 'Metro Manila, Philippines',
      isActive: true,
    },
    { upsert: true, new: true, runValidators: true },
  );

  const products = [
    {
      slug: 'nike-varsity-jacket',
      title: 'Nike Varsity Jacket',
      descriptions: ['A comfortable Nike jacket designed for NU students.'],
      category: uniform._id,
      supplier: nike._id,
      price: 1499,
      stockQuantity: 15,
      imageKey: 'nike-varsity-jacket.webp',
      isFeatured: true,
      isActive: true,
    },
    {
      slug: 'nike-training-uniform',
      title: 'Nike Training Uniform',
      descriptions: ['A lightweight training uniform for school activities.'],
      category: uniform._id,
      supplier: nike._id,
      price: 999,
      stockQuantity: 25,
      imageKey: 'nike-training-uniform.webp',
      isActive: true,
    },
    {
      slug: 'adidas-campus-jacket',
      title: 'Adidas Campus Jacket',
      descriptions: ['A campus jacket supplied by Adidas.'],
      category: uniform._id,
      supplier: adidas._id,
      price: 1299,
      stockQuantity: 12,
      imageKey: 'adidas-campus-jacket.webp',
      isActive: true,
    },
  ];

  for (const product of products) {
    await Product.findOneAndUpdate(
      { slug: product.slug },
      product,
      { upsert: true, new: true, runValidators: true },
    );
  }

  console.log('Part 7 seed complete: Uniform, Nike, Adidas, and 3 products');
}

seedPart7()
  .then(disconnectDatabase)
  .catch(async (error) => {
    console.error(error);
    await disconnectDatabase();
    process.exitCode = 1;
  });
