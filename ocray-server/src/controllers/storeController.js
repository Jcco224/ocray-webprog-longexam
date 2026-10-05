import { Category, Order, Product } from '../models/index.js';

// Public storefront summary. Only aggregate counts are returned; no customer data is exposed.
export async function getStoreOverview(_req, res) {
  const [products, categories, orders, completedOrders] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Category.countDocuments({ isActive: true }),
    Order.countDocuments(),
    Order.countDocuments({ status: 'completed' }),
  ]);

  return res.json({
    success: true,
    overview: { products, categories, orders, completedOrders },
  });
}
