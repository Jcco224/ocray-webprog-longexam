import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Cart, Category, Order, Product, Review, User } from '../models/index.js';

const models = [User, Category, Product, Cart, Order, Review];

function hasSameKey(first, second) {
  return JSON.stringify(Object.entries(first)) === JSON.stringify(Object.entries(second));
}

async function createIndexes() {
  await connectDatabase();

  for (const model of models) {
    let indexes = await model.collection.indexes();
    for (const [fields, options] of model.schema.indexes()) {
      const matchingIndex = indexes.find((index) => hasSameKey(index.key, fields));
      if (matchingIndex) continue;

      const isTextIndex = Object.values(fields).includes('text');
      const existingTextIndex = indexes.find((index) => Object.values(index.key).includes('text'));
      if (isTextIndex && existingTextIndex) {
        console.log(`Keeping existing text index ${existingTextIndex.name} on ${model.collection.collectionName}`);
        continue;
      }

      await model.collection.createIndex(fields, options);
      indexes = await model.collection.indexes();
    }

    console.log(`\n${model.collection.collectionName}:`);
    for (const index of indexes) {
      console.log(`  - ${index.name}: ${JSON.stringify(index.key)}`);
    }
  }

  console.log('\nAll Bulldogs Exchange indexes are available.');
}

createIndexes()
  .then(disconnectDatabase)
  .catch(async (error) => {
    console.error(`Index creation failed: ${error.message}`);
    await disconnectDatabase();
    process.exitCode = 1;
  });
