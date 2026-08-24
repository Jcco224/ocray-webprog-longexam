import { MongoMemoryServer } from 'mongodb-memory-server';
import app from './app.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { productSeeds } from './data/products.js';
import Category from './models/categoryModel.js';
import Product from './models/productModel.js';

const port = Number(process.env.PORT) || 5000;
process.env.JWT_SECRET ??= 'bulldogex-local-demo-secret-change-me';
let mongod;

async function startDemo() {
  mongod = await MongoMemoryServer.create();
  await connectDatabase(mongod.getUri('bulldogs_exchange_demo'));
  const categoryNames = [...new Set(productSeeds.map((product) => product.category))];
  const categories = await Category.insertMany(categoryNames.map((name) => ({
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: `${name} products available from Bulldogs Exchange.`,
  })));
  const categoryIds = new Map(categories.map((category) => [category.name, category._id]));
  await Product.insertMany(productSeeds.map((product) => ({ ...product, category: categoryIds.get(product.category) })));
  const server = app.listen(port, () => {
    console.log(`BE Backend demo running at http://localhost:${port}`);
    console.log('Temporary MongoDB is connected and 10 products are loaded.');
  });

  async function shutdown() {
    server.close(async () => {
      await disconnectDatabase();
      await mongod.stop();
      process.exit(0);
    });
  }
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

startDemo().catch(async (error) => {
  console.error(`Demo startup failed: ${error.message}`);
  await disconnectDatabase();
  if (mongod) await mongod.stop();
  process.exit(1);
});
