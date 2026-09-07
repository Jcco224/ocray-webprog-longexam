import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import localProducts from '../assets/product-content.js';
import {
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '../services/api.js';

export default function CartModal({ open, onClose }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: '' });
  const [updatingProduct, setUpdatingProduct] = useState('');

  const total = useMemo(() => (
    cart?.items?.reduce(
      (sum, item) => sum + Number(item.product?.price ?? 0) * Number(item.quantity ?? 0),
      0,
    ) ?? 0
  ), [cart]);

  const loadCart = async () => {
    setStatus({ loading: true, error: '' });
    try {
      const data = await fetchCart();
      setCart(data.cart);
      setStatus({ loading: false, error: '' });
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  useEffect(() => {
    if (!open) return undefined;

    loadCart();
    const closeWithEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeWithEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeWithEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const changeQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    setUpdatingProduct(productId);
    try {
      const data = await updateCartItem(productId, quantity);
      setCart(data.cart);
      setStatus({ loading: false, error: '' });
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    } finally {
      setUpdatingProduct('');
    }
  };

  const removeItem = async (productId) => {
    setUpdatingProduct(productId);
    try {
      const data = await removeCartItem(productId);
      setCart(data.cart);
      setStatus({ loading: false, error: '' });
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    } finally {
      setUpdatingProduct('');
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-end bg-black/65 p-4 pt-24 backdrop-blur-sm sm:p-6 sm:pt-28"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        className="flex max-h-[calc(100vh-8rem)] w-full max-w-md flex-col overflow-hidden rounded-3xl border-2 border-amber-500 bg-zinc-950 text-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-400">Shopping Cart</p>
            <h2 id="cart-modal-title" className="mt-1 text-2xl font-black">My Cart</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full border border-amber-500 text-xl font-bold text-white transition hover:bg-amber-500"
          >
            ×
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-4">
          {status.loading && <p className="py-8 text-center text-sm text-zinc-300">Loading your cart...</p>}
          {status.error && <p role="alert" className="rounded-xl bg-red-950/70 p-3 text-sm text-red-200">{status.error}</p>}

          {!status.loading && !status.error && !cart?.items?.length && (
            <div className="py-10 text-center">
              <p className="text-lg font-bold">Your cart is empty.</p>
              <p className="mt-1 text-sm text-zinc-400">Add a product to see it here.</p>
            </div>
          )}

          {!status.loading && cart?.items?.length > 0 && (
            <div className="space-y-3">
              {cart.items.map((item) => {
                const productId = item.product?._id;
                const isUpdating = updatingProduct === productId;
                const productImage = localProducts.find((product) => product.name === item.product?.slug)?.image;
                return (
                  <article key={productId} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-amber-500/30 bg-zinc-800">
                          {productImage ? (
                            <img src={productImage} alt={item.product?.title ?? 'Cart product'} className="h-full w-full object-cover" />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-[10px] font-bold text-zinc-400">NO IMAGE</div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{item.product?.title ?? 'Unavailable product'}</h3>
                          <p className="mt-1 text-sm text-amber-300">
                            PHP {Number(item.product?.price ?? 0).toLocaleString('en-PH')}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={!productId || isUpdating}
                        onClick={() => removeItem(productId)}
                        className="text-xs font-bold uppercase tracking-wider text-red-300 transition hover:text-red-200 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs uppercase tracking-wider text-zinc-400">Quantity</span>
                      <div className="flex items-center overflow-hidden rounded-full border border-amber-500/70">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.product?.title ?? 'product'} quantity`}
                          disabled={!productId || isUpdating || item.quantity <= 1}
                          onClick={() => changeQuantity(productId, item.quantity - 1)}
                          className="h-8 w-9 bg-zinc-900 font-bold text-white transition hover:bg-amber-600 disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="grid h-8 min-w-9 place-items-center bg-zinc-900 px-2 text-sm font-bold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.product?.title ?? 'product'} quantity`}
                          disabled={!productId || isUpdating}
                          onClick={() => changeQuantity(productId, item.quantity + 1)}
                          className="h-8 w-9 bg-zinc-900 font-bold text-white transition hover:bg-amber-600 disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        <footer className="mt-auto border-t border-white/10 bg-black/30 px-5 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-zinc-300">Total</span>
            <strong className="text-xl text-amber-400">PHP {total.toLocaleString('en-PH')}</strong>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/account');
            }}
            className="w-full rounded-full border-2 border-amber-500 bg-amber-500 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-amber-600"
          >
            View Cart and Orders
          </button>
        </footer>
      </section>
    </div>
  );
}
