import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import localProducts from '../../assets/product-content.js';
import { adaptProduct, addCartItem, fetchProduct, getToken } from '../../services/api.js';

function ProductPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(() => localProducts.find((item) => item.name === name));
  const [loading, setLoading] = useState(true);
  const [cartStatus, setCartStatus] = useState({ loading: false, message: '', error: false });

  useEffect(() => {
    let active = true;
    fetchProduct(name)
      .then(({ product: apiProduct }) => {
        if (active) setProduct(adaptProduct(apiProduct, localProducts));
      })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [name]);

  const handleAddToCart = async () => {
    if (!getToken()) {
      navigate('/auth/signin');
      return;
    }
    if (!product.id) {
      setCartStatus({ loading: false, message: 'Start the API and seed MongoDB before adding items.', error: true });
      return;
    }
    if (product.stock === 'Out of stock') {
      setCartStatus({ loading: false, message: 'This product is out of stock.', error: true });
      return;
    }
    setCartStatus({ loading: true, message: '', error: false });
    try {
      await addCartItem(product.id);
      setCartStatus({ loading: false, message: 'Added to your cart.', error: false });
    } catch (error) {
      setCartStatus({ loading: false, message: error.message, error: true });
    }
  };

  if (loading && !product) {
    return <p className="px-6 py-16 text-center text-zinc-600">Loading product...</p>;
  }

  if (!product) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-zinc-900">Product not found</h1>
            <Button to="/products" className="mt-6">Back to Products</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-4">
            <Button to="/products">Back to Products</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
            <span className="font-bold text-zinc-900">{product.price}</span>
            <span>{product.stock}</span>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 overflow-hidden rounded-[1.25rem] border-2 border-zinc-900 bg-zinc-200">
            <img
              src={product.image}
              alt={product.title}
              className="aspect-4/3 w-full object-cover"
            />
          </div>

          <div className="prose prose-sm max-w-none space-y-4 text-zinc-700">
            {product.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-zinc-700 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t-2 border-zinc-900 pt-6">
            <Button variant="primary" className="mr-3" onClick={handleAddToCart} disabled={cartStatus.loading || product.stock === 'Out of stock'}>
              {product.stock === 'Out of stock' ? 'Out of Stock' : cartStatus.loading ? 'Adding...' : 'Add to Cart'}
            </Button>
            <Button to="/products">Back to Products</Button>
            {cartStatus.message && (
              <p role="status" className={`mt-4 text-sm ${cartStatus.error ? 'text-red-700' : 'text-green-700'}`}>
                {cartStatus.message}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductPage;
