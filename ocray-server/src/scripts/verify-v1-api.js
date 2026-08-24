import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import Supplier from '../models/supplierModel.js';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'bulldogs-exchange-v1-verification-secret';

let mongod;
let server;

async function request(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`);
  const body = await response.json();
  if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  return body;
}

function verifyStructure(body) {
  if (
    body.success !== true
    || typeof body.message !== 'string'
    || typeof body.count !== 'number'
    || !Array.isArray(body.data)
  ) {
    throw new Error('V1 response does not use success, message, count, and data');
  }
}

async function verifyV1Api() {
  const { default: app } = await import('../app.js');
  mongod = await MongoMemoryServer.create();
  await connectDatabase(mongod.getUri('bulldogs_exchange_v1_verification'));

  const category = await Category.create({
    name: 'Uniform',
    slug: 'uniform',
    description: 'Uniform test category.',
  });
  const nike = await Supplier.create({
    name: 'Nike',
    slug: 'nike',
    contactPerson: 'Test Supplier',
    email: 'nike@example.com',
    phone: '09170000001',
    address: 'Manila',
  });
  const adidas = await Supplier.create({
    name: 'Adidas',
    slug: 'adidas',
    contactPerson: 'Second Supplier',
    email: 'adidas@example.com',
    phone: '09170000002',
    address: 'Manila',
  });
  await Product.create([
    {
      slug: 'nike-varsity-jacket',
      title: 'Nike Varsity Jacket',
      descriptions: ['Nike jacket for students.'],
      category: category._id,
      supplier: nike._id,
      price: 1499,
      stockQuantity: 10,
      imageKey: 'nike-jacket.webp',
    },
    {
      slug: 'nike-training-uniform',
      title: 'Nike Training Uniform',
      descriptions: ['Nike school uniform.'],
      category: category._id,
      supplier: nike._id,
      price: 999,
      stockQuantity: 20,
      imageKey: 'nike-uniform.webp',
    },
    {
      slug: 'adidas-campus-jacket',
      title: 'Adidas Campus Jacket',
      descriptions: ['Adidas jacket for students.'],
      category: category._id,
      supplier: adidas._id,
      price: 1299,
      stockQuantity: 15,
      imageKey: 'adidas-jacket.webp',
    },
  ]);
  await Product.init();

  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}/api`;

  const versioned = await request(baseUrl, '/v1/product');
  verifyStructure(versioned);

  const pluralAlias = await request(baseUrl, '/v1/products');
  verifyStructure(pluralAlias);

  const multipleFilters = await request(baseUrl, '/v1/products?category=Uniform&supplier=Nike');
  verifyStructure(multipleFilters);
  if (multipleFilters.count !== 2) throw new Error('Multiple filters did not return two Nike uniforms');

  const search = await request(baseUrl, '/v1/products?search=jacket');
  verifyStructure(search);
  if (search.count !== 2) throw new Error('Keyword search did not return two jackets');

  const combined = await request(
    baseUrl,
    '/v1/products?page=1&limit=5&category=Uniform&supplier=Nike&sort=price&search=jacket',
  );
  verifyStructure(combined);
  if (combined.count !== 1 || combined.data[0].slug !== 'nike-varsity-jacket') {
    throw new Error('Combined Version 1 query returned unexpected products');
  }

  console.log('\nVersion 1 Product API verification:');
  console.log('  PASS  /api/v1/product');
  console.log('  PASS  /api/v1/products (plural alias)');
  console.log('  PASS  category=Uniform&supplier=Nike (2 products)');
  console.log('  PASS  search=jacket (2 products)');
  console.log('  PASS  pagination + filters + sorting + search (1 product)');
  console.log('  PASS  consistent success/message/count/data response');
}

verifyV1Api()
  .then(async () => {
    if (server) await new Promise((resolve) => server.close(resolve));
    await disconnectDatabase();
    await mongod.stop();
  })
  .catch(async (error) => {
    console.error(`V1 API verification failed: ${error.stack ?? error.message}`);
    if (server) await new Promise((resolve) => server.close(resolve));
    await disconnectDatabase();
    if (mongod) await mongod.stop();
    process.exitCode = 1;
  });
