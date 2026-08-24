import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import Category from '../models/categoryModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'bulldogs-exchange-api-verification-secret';

let mongod;
let server;

async function apiRequest(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const body = await response.json();
  if (!response.ok) throw new Error(`${options.method ?? 'GET'} ${path}: ${response.status} ${body.message}`);
  return { status: response.status, body };
}

async function expectStatus(baseUrl, path, expectedStatus, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  if (response.status !== expectedStatus) {
    const body = await response.json().catch(() => ({}));
    throw new Error(`${options.method ?? 'GET'} ${path}: expected ${expectedStatus}, received ${response.status} ${body.message ?? ''}`);
  }
  return response.status;
}

async function verifyApi() {
  const { default: app } = await import('../app.js');
  mongod = await MongoMemoryServer.create();
  await connectDatabase(mongod.getUri('bulldogs_exchange_api_verification'));

  const category = await Category.create({
    name: 'Uniform',
    slug: 'uniform',
    description: 'Official Bulldogs Exchange uniforms.',
  });
  const product = await Product.create({
    slug: 'api-verification-shirt',
    title: 'API Verification Shirt',
    descriptions: ['Product used by the controller and router verification.'],
    category: category._id,
    price: 699,
    stockQuantity: 12,
    imageKey: 'NUshirt.webp',
  });
  const suppliesCategory = await Category.create({
    name: 'School Supplies',
    slug: 'school-supplies',
    description: 'School supplies sold through Bulldogs Exchange.',
  });
  await Product.create({
    slug: 'api-verification-notebook',
    title: 'API Verification Notebook',
    descriptions: ['Non-uniform product used to verify category filtering.'],
    category: suppliesCategory._id,
    price: 99,
    stockQuantity: 20,
    imageKey: 'notebook.webp',
  });

  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}/api`;

  const registration = await apiRequest(baseUrl, '/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: 'api.student',
      email: 'api.student@example.com',
      password: 'Bulldog123',
      firstName: 'API',
      lastName: 'Student',
    }),
  });
  const authHeaders = { Authorization: `Bearer ${registration.body.token}` };

  const results = [];
  results.push(['POST /auth/register', registration.status]);
  results.push(['POST /auth/register (invalid)', await expectStatus(baseUrl, '/auth/register', 400, {
    method: 'POST',
    body: JSON.stringify({ username: 'missing.fields' }),
  })]);
  results.push(['GET /user/me (unauthenticated)', await expectStatus(baseUrl, '/user/me', 401)]);
  results.push(['POST /category (forbidden)', await expectStatus(baseUrl, '/category', 403, {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ name: 'Forbidden', slug: 'forbidden', description: 'Must not be created.' }),
  })]);
  await User.findByIdAndUpdate(registration.body.user.id, { role: 'admin' });

  const createdCategory = await apiRequest(baseUrl, '/category', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      name: 'API Merchandise',
      slug: 'api-merchandise',
      description: 'Category created during Part 5 API verification.',
    }),
  });
  const categoryId = createdCategory.body.category._id;
  results.push(['POST /category', createdCategory.status]);
  results.push(['GET /category/api-merchandise', (await apiRequest(baseUrl, '/category/api-merchandise')).status]);
  results.push(['PATCH /category/:id', (await apiRequest(baseUrl, `/category/${categoryId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({ description: 'Updated category used during Part 5 verification.' }),
  })).status]);

  const createdSupplier = await apiRequest(baseUrl, '/supplier', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      name: 'NU Merchandise Supply',
      slug: 'nu-merchandise-supply',
      contactPerson: 'Alex Santos',
      email: 'supplier@example.com',
      phone: '09171234567',
      address: 'Sampaloc, Manila',
    }),
  });
  const supplierId = createdSupplier.body.supplier._id;
  results.push(['POST /supplier', createdSupplier.status]);
  results.push(['GET /supplier', (await apiRequest(baseUrl, '/supplier')).status]);
  results.push(['GET /supplier/nu-merchandise-supply', (await apiRequest(baseUrl, '/supplier/nu-merchandise-supply')).status]);
  results.push(['PATCH /supplier/:id', (await apiRequest(baseUrl, `/supplier/${supplierId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({ phone: '09179876543' }),
  })).status]);

  const createdProduct = await apiRequest(baseUrl, '/product', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      slug: 'part-5-test-shirt',
      title: 'Part 5 Test Shirt',
      descriptions: ['Product created during Part 5 API testing.'],
      category: categoryId,
      price: 799,
      stockQuantity: 20,
      availability: 'in_stock',
      imageKey: 'test-shirt.webp',
    }),
  });
  const createdProductId = createdProduct.body.product._id;
  results.push(['POST /product', createdProduct.status]);
  results.push(['GET /product/part-5-test-shirt', (await apiRequest(baseUrl, '/product/part-5-test-shirt')).status]);
  results.push(['PATCH /product/:id', (await apiRequest(baseUrl, `/product/${createdProductId}`, {
    method: 'PATCH',
    headers: authHeaders,
    body: JSON.stringify({ price: 749, stockQuantity: 18 }),
  })).status]);

  results.push(['GET /product/not-found', await expectStatus(baseUrl, '/product/not-found', 404)]);
  results.push(['GET /category', (await apiRequest(baseUrl, '/category')).status]);
  results.push(['GET /product', (await apiRequest(baseUrl, '/product')).status]);
  const filteredProducts = await apiRequest(baseUrl, '/product?category=Uniform');
  if (
    filteredProducts.body.products.length !== 1
    || filteredProducts.body.products[0].category.slug !== 'uniform'
  ) {
    throw new Error('GET /product?category=Uniform returned products outside the Uniform category');
  }
  results.push(['GET /product?category=Uniform (1 matching product)', filteredProducts.status]);
  const sortedProducts = await apiRequest(baseUrl, '/product?sort=price');
  const sortedPrices = sortedProducts.body.products.map(({ price }) => price);
  if (sortedPrices.some((price, index) => index > 0 && price < sortedPrices[index - 1])) {
    throw new Error('GET /product?sort=price did not return prices in ascending order');
  }
  results.push([`GET /product?sort=price (prices: ${sortedPrices.join(', ')})`, sortedProducts.status]);
  results.push(['GET /user/me', (await apiRequest(baseUrl, '/user/me', { headers: authHeaders })).status]);
  results.push(['POST /cart/items', (await apiRequest(baseUrl, '/cart/items', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ productId: product._id, quantity: 2 }),
  })).status]);
  results.push(['POST /review', (await apiRequest(baseUrl, '/review', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({ productId: product._id, rating: 5, comment: 'Controller and router work correctly.' }),
  })).status]);
  results.push(['POST /order', (await apiRequest(baseUrl, '/order', {
    method: 'POST',
    headers: authHeaders,
    body: JSON.stringify({
      paymentMethod: 'cash_on_delivery',
      shippingAddress: {
        recipientName: 'API Student',
        phone: '09171234567',
        line1: '551 M. F. Jhocson Street',
        city: 'Manila',
        province: 'Metro Manila',
        postalCode: '1008',
      },
    }),
  })).status]);
  results.push(['GET /order', (await apiRequest(baseUrl, '/order', { headers: authHeaders })).status]);
  results.push(['DELETE /product/:id', (await apiRequest(baseUrl, `/product/${createdProductId}`, {
    method: 'DELETE',
    headers: authHeaders,
  })).status]);
  results.push(['GET deleted product (not found)', await expectStatus(baseUrl, '/product/part-5-test-shirt', 404)]);
  results.push(['DELETE /supplier/:id', (await apiRequest(baseUrl, `/supplier/${supplierId}`, {
    method: 'DELETE',
    headers: authHeaders,
  })).status]);
  results.push(['GET deleted supplier (not found)', await expectStatus(baseUrl, '/supplier/nu-merchandise-supply', 404)]);
  results.push(['DELETE /category/:id', (await apiRequest(baseUrl, `/category/${categoryId}`, {
    method: 'DELETE',
    headers: authHeaders,
  })).status]);

  console.log('\nController and Router API verification:');
  for (const [route, status] of results) console.log(`  PASS  ${status}  ${route}`);
  console.log(`\n${results.length} API requests passed.`);
}

verifyApi()
  .then(async () => {
    if (server) await new Promise((resolve) => server.close(resolve));
    await disconnectDatabase();
    await mongod.stop();
  })
  .catch(async (error) => {
    console.error(`API verification failed: ${error.stack ?? error.message}`);
    if (server) await new Promise((resolve) => server.close(resolve));
    await disconnectDatabase();
    if (mongod) await mongod.stop();
    process.exitCode = 1;
  });
