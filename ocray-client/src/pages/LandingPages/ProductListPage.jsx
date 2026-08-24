import { useEffect, useState } from 'react';
import Button from '../../components/Button.jsx';
import ProductList from '../../components/ProductList.jsx';
import localProducts from '../../assets/product-content.js';
import { adaptProduct, fetchProducts } from '../../services/api.js';

const ProductListPage = () => {
  const [products, setProducts] = useState(localProducts);
  const [apiAvailable, setApiAvailable] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProducts()
      .then(({ products: apiProducts }) => {
        if (active) setProducts(apiProducts.map((product) => adaptProduct(product, localProducts)));
      })
      .catch(() => {
        if (active) setApiAvailable(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="gold-silk-surface relative overflow-hidden border-y-4 border-amber-500 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.16),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.14),transparent_28%)]" />
        <div className="absolute right-[7%] top-[14%] hidden h-32 w-32 rounded-full border-[18px] border-yellow-500/20 border-l-transparent border-b-transparent lg:block" />
        <div className="absolute left-[6%] bottom-[16%] hidden h-20 w-20 rotate-12 rounded-[1.5rem] border border-yellow-400/20 bg-yellow-400/10 lg:block" />
        <div className="absolute right-[10%] bottom-[18%] hidden grid grid-cols-3 gap-2 md:grid">
          {Array.from({ length: 9 }).map((_, index) => (
            <span key={index} className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-amber-600/35 bg-white/65 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.36em] text-amber-800">
              Products
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
              Shop campus essentials in a
              <span className="block text-amber-700">bolder product showcase</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg">
              Browse everyday student picks, standout school merch, and must-have campus gear in a stronger black-and-gold storefront.
            </p>
            <div className="mt-8 flex flex-row flex-wrap items-center gap-4">
              <Button to="/" variant="secondary" className="px-8 py-4 text-sm tracking-[0.28em]">
                Back Home
              </Button>
              <div className="rounded-full border border-amber-600/30 bg-white/70 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-900">
                {products.length} Featured Products
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-[28rem]">
            <div className="rounded-[1.75rem] border border-yellow-400/20 bg-white/95 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">Top Picks</p>
              <p className="mt-3 text-3xl font-black text-zinc-950">Campus Gear</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Apparel, accessories, drinkware, and study-ready essentials.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-yellow-400 p-5 text-zinc-950 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-800/70">Best Value</p>
              <p className="mt-3 text-3xl font-black">From PHP 179</p>
              <p className="mt-2 text-sm leading-6 text-zinc-900/80">
                Affordable campus finds that still feel premium and useful.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gold-silk-surface rounded-[2rem] border border-amber-500/30 px-4 py-6 shadow-[0_24px_80px_rgba(120,80,20,0.16)] sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-800">
            Featured Products
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-zinc-900">Product card grid</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-700 sm:text-base">
            Explore our featured lineup in a darker, more premium product showcase built for the NU Bulldog Exchange look.
          </p>
          {!apiAvailable && (
            <p className="mx-auto mt-3 max-w-2xl rounded-xl border border-amber-500/30 bg-white/70 p-3 text-sm text-amber-900">
              The API is offline. Showing the built-in catalog; account and cart actions require the server.
            </p>
          )}
        </div>

        <ProductList products={products} />
      </section>
    </div>
  );
}

export default ProductListPage
