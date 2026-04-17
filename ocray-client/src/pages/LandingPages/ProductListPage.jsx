import Button from '../../components/Button.jsx';
import ProductList from '../../components/ProductList.jsx';
import products from '../../assets/product-content.js';

const ProductListPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="relative overflow-hidden border-y-4 border-yellow-500 bg-[linear-gradient(135deg,#050505_0%,#111111_52%,#1a1a1a_100%)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
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
            <p className="mb-4 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.36em] text-yellow-300">
              Products
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Shop campus essentials in a
              <span className="block text-yellow-400">bolder product showcase</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
              Browse everyday student picks, standout school merch, and must-have campus gear in a stronger black-and-gold storefront.
            </p>
            <div className="mt-8 flex flex-row flex-wrap items-center gap-4">
              <Button to="/" variant="secondary" className="px-8 py-4 text-sm tracking-[0.28em]">
                Back Home
              </Button>
              <div className="rounded-full border border-yellow-400/30 bg-zinc-950/40 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                10 Featured Products
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

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Products
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Product card grid</h2>
        </div>

        <ProductList products={products} />
      </section>
    </div>
  );
}

export default ProductListPage
