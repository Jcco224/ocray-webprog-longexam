const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
const TOKEN_KEY = 'bulldogex_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export async function apiRequest(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
export const fetchProduct = (slug) => apiRequest(`/product/${encodeURIComponent(slug)}`);

export const addCartItem = (productId, quantity = 1) => apiRequest('/cart/items', {
  method: 'POST',
  body: JSON.stringify({ productId, quantity }),
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
  };
}
