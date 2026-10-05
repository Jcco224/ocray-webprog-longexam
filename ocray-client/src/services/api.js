const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
const TOKEN_KEY = 'bulldogex_token';
const USER_KEY = 'bulldogex_user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const getCurrentUser = () => {
  const stored = localStorage.getItem(USER_KEY);
  return stored ? JSON.parse(stored) : null;
};
export const saveSession = ({ token, user }) => {
  saveToken(token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('bulldogex-session-change'));
};
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('bulldogex-session-change'));
};

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message ?? `Request failed (${response.status})`);
  return data;
}

export const registerAccount = (account) => apiRequest('/auth/register', {
  method: 'POST',
  body: JSON.stringify(account),
});

export const loginAccount = (credentials) => apiRequest('/auth/login', {
  method: 'POST',
  body: JSON.stringify(credentials),
});

export const fetchProducts = () => apiRequest('/product');
export const searchProducts = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, value);
  });
  return apiRequest(`/product${query.toString() ? `?${query}` : ''}`);
};
export const fetchProduct = (slug) => apiRequest(`/product/${encodeURIComponent(slug)}`);
export const fetchCategories = () => apiRequest('/category');
export const fetchSuppliers = () => apiRequest('/supplier');
export const fetchStoreOverview = () => apiRequest('/store/overview');

export const addCartItem = (productId, quantity = 1) => apiRequest('/cart/items', {
  method: 'POST',
  body: JSON.stringify({ productId, quantity }),
});
export const fetchCart = () => apiRequest('/cart');
export const updateCartItem = (productId, quantity) => apiRequest(`/cart/items/${productId}`, {
  method: 'PATCH',
  body: JSON.stringify({ quantity }),
});
export const removeCartItem = (productId) => apiRequest(`/cart/items/${productId}`, {
  method: 'DELETE',
});
export const createOrder = (payload) => apiRequest('/order', {
  method: 'POST',
  body: JSON.stringify(payload),
});
export const fetchMyOrders = () => apiRequest('/order');
export const fetchProfile = () => apiRequest('/user/me');
export const updateProfile = (payload) => apiRequest('/user/me', {
  method: 'PATCH',
  body: JSON.stringify(payload),
});
export const changePassword = (payload) => apiRequest('/user/me/password', {
  method: 'PATCH',
  body: JSON.stringify(payload),
});
export const fetchProductReviews = (productId) => apiRequest(`/review/product/${productId}`);
export const createReview = (payload) => apiRequest('/review', {
  method: 'POST',
  body: JSON.stringify(payload),
});

export const createProduct = (payload) => apiRequest('/product', {
  method: 'POST',
  body: JSON.stringify(payload),
});
export const updateProduct = (id, payload) => apiRequest(`/product/${id}`, {
  method: 'PATCH',
  body: JSON.stringify(payload),
});
export const fetchAdminOrders = () => apiRequest('/order/admin/all');
export const updateOrderStatus = (id, status) => apiRequest(`/order/${id}/status`, {
  method: 'PATCH',
  body: JSON.stringify({ status }),
});
export const fetchAdminReviews = () => apiRequest('/review');
export const updateReview = (id, payload) => apiRequest(`/review/${id}`, {
  method: 'PATCH',
  body: JSON.stringify(payload),
});
export const approveReview = (id) => apiRequest(`/review/${id}/approve`, { method: 'PATCH' });
export const fetchUsers = () => apiRequest('/user');
export const updateUser = (id, payload) => apiRequest(`/user/${id}`, {
  method: 'PATCH',
  body: JSON.stringify(payload),
});

const availabilityLabels = {
  in_stock: 'In stock',
  low_stock: 'Low stock',
  preorder: 'Preorder',
  out_of_stock: 'Out of stock',
};

export function adaptProduct(product, localProducts) {
  const local = localProducts.find((item) => item.name === product.slug) ?? {};
  return {
    ...local,
    id: product._id,
    name: product.slug,
    title: product.title,
    category: product.category?.name ?? product.category,
    price: `PHP ${Number(product.price).toLocaleString('en-PH')}`,
    stock: availabilityLabels[product.availability] ?? product.availability,
    content: product.descriptions,
    image: resolveProductImage(product, localProducts),
  };
}

export function resolveProductImage(product, localProducts = []) {
  if (/^https:\/\/res\.cloudinary\.com\//i.test(product?.imageKey ?? '')) return product.imageKey;
  return localProducts.find((item) => item.name === product?.slug)?.image ?? '';
}
