import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import localProducts from '../../assets/product-content.js';
import {
  approveReview,
  clearToken,
  createProduct,
  fetchAdminOrders,
  fetchAdminReviews,
  fetchCategories,
  fetchProducts,
  fetchSuppliers,
  fetchUsers,
  getCurrentUser,
  getToken,
  resolveProductImage,
  updateOrderStatus,
  updateProduct,
  updateReview,
  updateUser,
} from '../../services/api.js';

const panelClass = 'rounded-2xl border border-amber-500/25 bg-white/92 p-5 shadow-[0_18px_48px_rgba(80,60,20,0.12)]';
const inputClass = 'w-full rounded-xl border border-amber-700/20 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-amber-600';
const formatOrderStatus = (status) => (status ?? 'pending').replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const emptyProduct = {
  slug: '',
  title: '',
  descriptions: [''],
  category: '',
  supplier: '',
  price: 0,
  stockQuantity: 1,
  availability: 'in_stock',
  imageKey: '',
  isFeatured: false,
  isActive: true,
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProductId, setEditingProductId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [savingProduct, setSavingProduct] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('products');

  const loadAdmin = async () => {
    const [productData, categoryData, supplierData, orderData, reviewData, userData] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchSuppliers(),
      fetchAdminOrders(),
      fetchAdminReviews(),
      fetchUsers(),
    ]);
    setProducts(productData.products ?? []);
    setCategories(categoryData.categories ?? []);
    setSuppliers(supplierData.suppliers ?? []);
    setOrders(orderData.orders ?? []);
    setReviews(reviewData.reviews ?? []);
    setUsers(userData.users ?? []);
    setProductForm((current) => ({
      ...current,
      category: current.category || categoryData.categories?.[0]?._id || '',
      supplier: current.supplier || supplierData.suppliers?.[0]?._id || '',
    }));
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!getToken() || currentUser?.role !== 'admin') {
      navigate('/auth/signin');
      return;
    }
    const loader = window.setTimeout(() => {
      loadAdmin().catch((error) => setMessage(error.message));
    }, 0);
    return () => window.clearTimeout(loader);
  }, [navigate]);

  const handleProductChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setProductForm((current) => ({
      ...current,
      [target.name]: target.name === 'descriptions' ? [value] : value,
    }));
  };

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return undefined;
    }
    const preview = URL.createObjectURL(imageFile);
    setImagePreview(preview);
    return () => URL.revokeObjectURL(preview);
  }, [imageFile]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) {
      setImageFile(null);
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage('Choose a JPEG, PNG, or WebP image.');
      setImageFile(null);
      event.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image must be 5 MB or smaller.');
      setImageFile(null);
      event.target.value = '';
      return;
    }
    setMessage('');
    setImageFile(file);
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    if (!editingProductId && !imageFile) {
      setMessage('Choose a product image before creating the product.');
      return;
    }
    const payload = new FormData();
    Object.entries(productForm).forEach(([key, value]) => {
      if (key === 'descriptions') payload.append(key, value[0]);
      else if (key !== 'imageKey' || editingProductId) payload.append(key, value);
    });
    if (imageFile) payload.append('image', imageFile);
    setSavingProduct(true);
    try {
      if (editingProductId) await updateProduct(editingProductId, payload);
      else await createProduct(payload);
      setMessage(editingProductId ? 'Product updated with its image.' : 'Product created with its image.');
      setEditingProductId('');
      setProductForm({ ...emptyProduct, category: categories[0]?._id || '', supplier: suppliers[0]?._id || '' });
      setImageFile(null);
      formElement.reset();
      await loadAdmin();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingProduct(false);
    }
  };

  const startEditProduct = (product) => {
    setEditingProductId(product._id);
    setProductForm({
      slug: product.slug,
      title: product.title,
      descriptions: product.descriptions?.length ? product.descriptions : [''],
      category: product.category?._id ?? product.category,
      supplier: product.supplier?._id ?? product.supplier ?? '',
      price: product.price,
      stockQuantity: product.stockQuantity,
      availability: product.availability,
      imageKey: product.imageKey,
      isFeatured: Boolean(product.isFeatured),
      isActive: Boolean(product.isActive),
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setUserActive = async (user, isActive) => {
    await updateUser(user._id, { isActive });
    await loadAdmin();
    setMessage(`User ${isActive ? 'activated' : 'deactivated'}.`);
  };

  const setOrderStatus = async (order, status) => {
    try {
      await updateOrderStatus(order._id, status);
      await loadAdmin();
      setMessage(`${order.orderNumber} is now ${formatOrderStatus(status)}. The customer can see this update in Ongoing Orders.`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const navItems = [
    { id: 'products', label: 'Products', count: products.length, description: 'Create, view, and edit products' },
    { id: 'orders', label: 'Orders', count: orders.length, description: 'Confirm and prepare customer orders' },
    { id: 'reviews', label: 'Reviews', count: reviews.length, description: 'View and approve customer reviews' },
    { id: 'users', label: 'Manage Users', count: users.length, description: 'View and activate user accounts' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-zinc-900 sm:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-[1600px] items-stretch gap-6 lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="flex flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-4 text-white shadow-2xl">
          <div className="border-b border-zinc-800 px-3 pb-5">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-400">BulldogEx Shop</p>
            <h1 className="mt-2 text-2xl font-black text-white">Admin Panel</h1>
            <p className="mt-2 text-xs leading-5 text-zinc-400">Store management workspace</p>
          </div>
          <p className="px-3 pb-3 pt-5 text-[10px] font-bold uppercase tracking-[0.26em] text-amber-400">Menu</p>
          <nav className="space-y-2" aria-label="Admin sections">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${activeSection === item.id ? 'bg-amber-500 text-white shadow-lg' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'}`}
              >
                <span>{item.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${activeSection === item.id ? 'bg-white/20 text-white' : 'bg-zinc-800 text-amber-300'}`}>{item.count}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto border-t border-zinc-800 px-3 pt-5">
            <p className="mb-4 text-xs leading-5 text-zinc-400">Only administrators can use these controls.</p>
            <button
              type="button"
              onClick={() => { clearToken(); navigate('/auth/signin'); }}
              className="w-full rounded-xl border border-red-400/50 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-red-200 transition hover:bg-red-500 hover:text-white"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="min-w-0 py-2 lg:py-7">
          <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Admin Area</p>
            <h2 className="mt-1 text-2xl font-black text-zinc-950">{navItems.find((item) => item.id === activeSection)?.label}</h2>
            <p className="mt-1 text-sm text-zinc-600">{navItems.find((item) => item.id === activeSection)?.description}</p>
          </section>

          {message && <p role="status" className="mb-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">{message}</p>}

      {activeSection === 'products' && <section className={panelClass}>
        <h2 className="text-2xl font-black text-zinc-950">Product Create, View, Edit</h2>
        <form className="mt-4 grid gap-3 md:grid-cols-3" onSubmit={handleProductSubmit}>
          <input className={inputClass} name="slug" placeholder="slug" value={productForm.slug} onChange={handleProductChange} required />
          <input className={inputClass} name="title" placeholder="title" value={productForm.title} onChange={handleProductChange} required />
          <input className={inputClass} name="price" type="number" placeholder="price" value={productForm.price} onChange={handleProductChange} required />
          <input className={inputClass} name="stockQuantity" type="number" placeholder="stock" value={productForm.stockQuantity} onChange={handleProductChange} required />
          <select className={inputClass} name="category" value={productForm.category} onChange={handleProductChange} required>
            {categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}
          </select>
          <select className={inputClass} name="supplier" value={productForm.supplier} onChange={handleProductChange}>
            <option value="">No supplier</option>
            {suppliers.map((supplier) => <option key={supplier._id} value={supplier._id}>{supplier.name}</option>)}
          </select>
          <label className={`${inputClass} flex flex-col gap-1`}>
            <span className="text-xs font-bold text-zinc-700">Product image (JPEG, PNG, or WebP; max 5 MB)</span>
            <input type="file" name="image" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} required={!editingProductId} />
          </label>
          <input className={`${inputClass} md:col-span-2`} name="descriptions" placeholder="description" value={productForm.descriptions[0]} onChange={handleProductChange} required />
          {(imagePreview || resolveProductImage(productForm, localProducts)) && (
            <div className="md:col-span-3">
              <p className="mb-2 text-sm font-bold text-zinc-700">Image preview</p>
              <img src={imagePreview || resolveProductImage(productForm, localProducts)} alt="Product preview" className="h-40 w-40 rounded-xl border border-zinc-200 object-cover" />
            </div>
          )}
          <Button type="submit" className="md:col-span-3" disabled={savingProduct}>{savingProduct ? 'Saving...' : editingProductId ? 'Edit Product' : 'Create Product'}</Button>
        </form>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {products.slice(0, 8).map((product) => (
            <div key={product._id} className="flex items-center justify-between gap-3 rounded-xl bg-zinc-50 p-3">
              <div className="flex items-center gap-3">
                {resolveProductImage(product, localProducts) && <img src={resolveProductImage(product, localProducts)} alt="" className="h-14 w-14 rounded-lg object-cover" />}
                <div>
                <p className="font-bold text-zinc-950">{product.title}</p>
                <p className="text-sm text-zinc-600">PHP {Number(product.price).toLocaleString('en-PH')}</p>
                </div>
              </div>
              <Button onClick={() => startEditProduct(product)}>Edit</Button>
            </div>
          ))}
        </div>
      </section>}

      {activeSection === 'orders' && <section className={panelClass}>
          <h2 className="text-2xl font-black text-zinc-950">Order Confirm and Ready for Claiming</h2>
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-zinc-950">{order.orderNumber}</p>
                    <p className="mt-1 text-sm text-zinc-600">
                      Customer: {order.user?.firstName} {order.user?.lastName} {order.user?.email ? `(${order.user.email})` : ''}
                    </p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">{formatOrderStatus(order.status)}</span>
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Items from customer cart</p>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-700">
                    {order.items?.map((item) => <li key={`${order._id}-${item.product}`}>{item.title} — Qty {item.quantity} × PHP {Number(item.unitPrice).toLocaleString('en-PH')}</li>)}
                  </ul>
                  <p className="mt-3 font-bold text-zinc-950">Order total: PHP {Number(order.subtotal ?? 0).toLocaleString('en-PH')}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button onClick={() => setOrderStatus(order, 'confirmed')} disabled={order.status === 'confirmed' || order.status === 'ready_for_claiming'}>Confirm Order</Button>
                  <Button onClick={() => setOrderStatus(order, 'ready_for_claiming')} disabled={order.status === 'ready_for_claiming'}>Ready for Claiming</Button>
                  <Button onClick={() => setOrderStatus(order, 'completed')} disabled={order.status !== 'ready_for_claiming'}>Complete Order</Button>
                </div>
              </div>
            ))}
            {!orders.length && <p className="text-sm text-zinc-600">No orders yet.</p>}
          </div>
      </section>}

      {activeSection === 'reviews' && <section className={panelClass}>
          <h2 className="text-2xl font-black text-zinc-950">Review Edit and View</h2>
          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <div key={review._id} className="rounded-xl bg-zinc-50 p-3">
                <p className="font-bold text-zinc-950">{review.product?.title ?? 'Product'} - {review.rating}/5</p>
                <p className="text-sm text-zinc-600">{review.comment}</p>
                <div className="mt-3 flex gap-2">
                  <Button onClick={() => updateReview(review._id, { comment: `${review.comment} ` }).then(loadAdmin)}>Edit Review</Button>
                  <Button onClick={() => approveReview(review._id).then(loadAdmin)}>Approve</Button>
                </div>
              </div>
            ))}
            {!reviews.length && <p className="text-sm text-zinc-600">No reviews yet.</p>}
          </div>
      </section>}

      {activeSection === 'users' && <section className={panelClass}>
        <h2 className="text-2xl font-black text-zinc-950">Manage Users View, Edit, Active or Inactive</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {users.map((user) => (
            <div key={user._id} className="rounded-xl bg-zinc-50 p-3">
              <p className="font-bold text-zinc-950">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-zinc-600">{user.email} - {user.role} - {user.isActive ? 'Active' : 'Inactive'}</p>
              <div className="mt-3 flex gap-2">
                <Button onClick={() => updateUser(user._id, { firstName: `${user.firstName}` }).then(loadAdmin)}>Edit User</Button>
                <Button onClick={() => setUserActive(user, !user.isActive)}>{user.isActive ? 'Set Inactive' : 'Set Active'}</Button>
              </div>
            </div>
          ))}
        </div>
      </section>}
        </main>
      </div>
    </div>
  );
}
