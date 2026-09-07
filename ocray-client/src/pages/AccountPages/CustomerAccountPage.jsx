import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import localProducts from '../../assets/product-content.js';
import {
  addCartItem,
  adaptProduct,
  clearToken,
  createOrder,
  createReview,
  fetchCart,
  fetchCategories,
  fetchMyOrders,
  fetchProductReviews,
  fetchProfile,
  getToken,
  removeCartItem,
  searchProducts,
} from '../../services/api.js';

const panelClass = 'rounded-2xl border border-amber-500/25 bg-white/92 p-5 shadow-[0_18px_48px_rgba(80,60,20,0.12)]';
const inputClass = 'w-full rounded-xl border border-amber-700/20 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-amber-600';
const labelClass = 'text-xs font-bold uppercase tracking-[0.18em] text-amber-800';
const formatOrderStatus = (status) => (status ?? 'pending').replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const defaultAddress = {
  recipientName: 'John Carlo Ocray',
  phone: '09123456789',
  line1: 'NU Campus',
  line2: '',
  city: 'Manila',
  province: 'Metro Manila',
  postalCode: '1008',
};

export default function CustomerAccountPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [filters, setFilters] = useState({ search: '', category: '' });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: 'Good campus product.' });
  const [message, setMessage] = useState('');

  const displayProducts = useMemo(() => (
    products.map((product) => adaptProduct(product, localProducts))
  ), [products]);

  const cartTotal = useMemo(() => (
    cart?.items?.reduce((total, item) => total + Number(item.product?.price ?? 0) * item.quantity, 0) ?? 0
  ), [cart]);

  const loadAccount = useCallback(async () => {
    const [profileData, productData, categoryData, cartData, orderData] = await Promise.all([
      fetchProfile(),
      searchProducts({ limit: 12, search: filters.search, category: filters.category }),
      fetchCategories(),
      fetchCart(),
      fetchMyOrders(),
    ]);
    setProfile(profileData.user);
    setProducts(productData.products ?? []);
    setCategories(categoryData.categories ?? []);
    setCart(cartData.cart);
    setOrders(orderData.orders ?? []);
    if ((productData.products ?? [])[0]?._id) setSelectedProduct((current) => current || productData.products[0]._id);
  }, [filters.category, filters.search]);

  useEffect(() => {
    if (!getToken()) {
      navigate('/auth/signin');
      return;
    }
    const loader = window.setTimeout(() => {
      loadAccount().catch((error) => setMessage(error.message));
    }, 0);
    return () => window.clearTimeout(loader);
  }, [loadAccount, navigate]);

  useEffect(() => {
    if (!getToken()) return undefined;
    const refreshOrderStatus = window.setInterval(() => {
      fetchMyOrders().then((data) => setOrders(data.orders ?? [])).catch(() => {});
    }, 10000);
    return () => window.clearInterval(refreshOrderStatus);
  }, []);

  useEffect(() => {
    searchProducts({ limit: 12, search: filters.search, category: filters.category })
      .then((data) => setProducts(data.products ?? []))
      .catch((error) => setMessage(error.message));
  }, [filters]);

  useEffect(() => {
    if (!selectedProduct) return;
    fetchProductReviews(selectedProduct)
      .then((data) => setReviews(data.reviews ?? []))
      .catch(() => setReviews([]));
  }, [selectedProduct]);

  const refreshCart = async () => {
    const data = await fetchCart();
    setCart(data.cart);
  };

  const handleAddToCart = async (productId) => {
    await addCartItem(productId, 1);
    await refreshCart();
    setMessage('Product added to cart.');
  };

  const handleCreateOrder = async () => {
    await createOrder({ shippingAddress: profile?.address ?? defaultAddress, paymentMethod: 'cash_on_delivery' });
    await loadAccount();
    setMessage('Order created and marked as ongoing.');
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    await createReview({ productId: selectedProduct, ...reviewForm, rating: Number(reviewForm.rating) });
    setMessage('Review created. It will show publicly after approval.');
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-12">
      <section className="grid gap-6 lg:grid-cols-[1fr_25rem]">
        <div className="rounded-3xl border border-amber-500/30 bg-zinc-950 p-6 text-white shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">Customer Account</p>
        <h1 className="mt-3 text-4xl font-black">Welcome, {profile?.firstName ?? 'Customer'}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
          Access products, reviews, cart, ongoing orders, and profile settings from one page.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button to="/products" variant="primary">Products</Button>
          <Button onClick={() => { clearToken(); navigate('/auth/signin'); }}>Logout</Button>
        </div>
        </div>

        <aside className="sticky top-28 rounded-3xl border border-amber-500/40 bg-zinc-950 p-5 text-white shadow-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-amber-400">Cart</p>
              <h2 className="mt-1 text-2xl font-black">My Cart</h2>
            </div>
            <span className="rounded-full bg-amber-500 px-3 py-1 text-sm font-black text-white">
              {cart?.items?.length ?? 0}
            </span>
          </div>

          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
            {cart?.items?.map((item) => {
              const productImage = localProducts.find((product) => product.name === item.product?.slug)?.image;
              return (
              <div key={item.product?._id} className="rounded-2xl border border-white/10 bg-white/8 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-amber-500/30 bg-zinc-800">
                      {productImage ? (
                        <img src={productImage} alt={item.product?.title ?? 'Cart product'} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-[10px] font-bold text-zinc-400">NO IMAGE</div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white">{item.product?.title}</p>
                      <p className="mt-1 text-sm text-amber-300">PHP {Number(item.product?.price ?? 0).toLocaleString('en-PH')} each</p>
                      <p className="text-sm text-zinc-300">Qty {item.quantity} · Subtotal: PHP {(Number(item.product?.price ?? 0) * item.quantity).toLocaleString('en-PH')}</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-[0.16em] text-red-300" onClick={() => removeCartItem(item.product._id).then(refreshCart)}>Remove</button>
                </div>
              </div>
              );
            })}
            {!cart?.items?.length && <p className="text-sm text-zinc-300">Cart is empty.</p>}
          </div>

          <p className="mt-4 font-bold text-white">Total: PHP {cartTotal.toLocaleString('en-PH')}</p>
          <Button className="mt-4 w-full" onClick={handleCreateOrder} disabled={!cart?.items?.length}>Create Order</Button>
        </aside>
      </section>

      {message && <p className="rounded-xl border border-amber-500/30 bg-amber-50 p-4 text-sm text-amber-900">{message}</p>}

      <section className={panelClass}>
        <h2 className="text-2xl font-black text-zinc-950">Products Search and Category</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <input className={inputClass} placeholder="Search products" value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} />
          <select className={inputClass} value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
            <option value="">All categories</option>
            {categories.map((category) => <option key={category._id} value={category.slug}>{category.name}</option>)}
          </select>
          <select className={inputClass} value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)}>
            {products.map((product) => <option key={product._id} value={product._id}>{product.title}</option>)}
          </select>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {displayProducts.map((product) => (
            <article key={product._id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <div className="mb-4 overflow-hidden rounded-xl border border-amber-900/10 bg-amber-50">
                <img src={product.image} alt={product.title} className="aspect-4/3 w-full object-cover" />
              </div>
              <h3 className="font-bold text-zinc-950">{product.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{product.price}</p>
              <Button className="mt-4" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={panelClass}>
          <h2 className="text-2xl font-black text-zinc-950">Ongoing Orders</h2>
          <p className="mt-1 text-sm text-zinc-600">Order status updates automatically after the admin confirms your order.</p>
          <div className="mt-5 space-y-2">
            {orders.map((order) => (
              <div key={order._id} className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold">{order.orderNumber}</p>
                  <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">{formatOrderStatus(order.status)}</span>
                </div>
                <p className="mt-2">Total: PHP {Number(order.subtotal ?? 0).toLocaleString('en-PH')}</p>
                {order.status === 'ready_for_claiming' && <p className="mt-2 font-bold text-green-800">Your order is ready for claiming.</p>}
                {order.status === 'confirmed' && <p className="mt-2 font-semibold text-amber-900">Your order was confirmed and is being prepared.</p>}
              </div>
            ))}
            {!orders.length && <p className="text-sm text-zinc-600">No ongoing orders yet.</p>}
          </div>
        </div>

        <div className={panelClass}>
          <h2 className="text-2xl font-black text-zinc-950">Reviews</h2>
          <form className="mt-4 space-y-3" onSubmit={handleReviewSubmit}>
            <label className={labelClass}>Rating</label>
            <input className={inputClass} type="number" min="1" max="5" value={reviewForm.rating} onChange={(event) => setReviewForm({ ...reviewForm, rating: event.target.value })} />
            <label className={labelClass}>Comment</label>
            <textarea className={inputClass} value={reviewForm.comment} onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })} />
            <Button type="submit">Create Review</Button>
          </form>
          <div className="mt-4 space-y-2">
            {reviews.map((review) => <p key={review._id} className="rounded-xl bg-zinc-50 p-3 text-sm text-zinc-700">{review.rating}/5 - {review.comment}</p>)}
            {!reviews.length && <p className="text-sm text-zinc-600">No approved reviews yet.</p>}
          </div>
        </div>
      </section>

    </div>
  );
}
