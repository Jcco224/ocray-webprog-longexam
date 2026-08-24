import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../assets/img/nubdexchange_logo.png';
import products from '../../assets/product-content';

const categoryCards = Object.values(
  products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        name: product.category,
        image: product.image,
        itemCount: 0,
      };
    }

    acc[product.category].itemCount += 1;
    return acc;
  }, {})
);

const CategoryGridSection = ({ categories }) => (
  <section className="gold-silk-surface rounded-[2rem] border border-amber-500/25 px-6 py-8 shadow-[0_24px_80px_rgba(120,80,20,0.14)] sm:px-8 sm:py-10">
    <div className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-800">
        Category Grid
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
        Shop by category
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-700 sm:text-base">
        Explore official NU Bulldog Exchange picks through a cleaner, faster category view.
      </p>
    </div>

    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to="/products"
          className="gold-glass-card group flex h-full min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border transition duration-300 hover:-translate-y-1 hover:border-amber-500/45"
        >
          <div className="relative aspect-[4/3] overflow-hidden border-b border-white/8 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_58%),#181818]">
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.5)_100%)]" />
          </div>

          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 transition group-hover:text-amber-800">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {category.itemCount} {category.itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>

            <span className="mt-6 inline-flex w-fit rounded-full border border-amber-600/25 bg-amber-100/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-amber-900">
              View Category
            </span>
          </div>
        </Link>
      ))}
    </div>

    <div className="mt-8 flex justify-center">
      <Button
        to="/products"
        variant="primary"
        className="rounded-xl border-[#D4AF37] bg-[#D4AF37] px-6 py-3 text-sm tracking-[0.18em] text-white hover:border-[#b89222] hover:bg-[#b89222]"
      >
        View Products
      </Button>
    </div>
  </section>
);

const AboutPage = () => {
  return (
    <div className="gold-silk-page flex w-full flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="gold-silk-surface overflow-hidden rounded-[2rem] border border-amber-500/25 shadow-[0_26px_80px_rgba(120,80,20,0.14)]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="gold-glass-card relative overflow-hidden rounded-[1.75rem] border p-6">
            <div className="absolute -left-14 bottom-0 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] border border-amber-900/10 bg-white/70">
              <img
                src={logo}
                alt="BulldogEx"
                className="h-32 w-32 rounded-full border-2 border-amber-500/40 bg-white object-contain shadow-[0_12px_30px_rgba(212,175,55,0.18)]"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-800">
              About Store
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A campus shop focused on useful products and simple ordering.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-700 sm:text-base">
              BulldogEx Shop keeps the low-fidelity layout system while presenting clear
              product categories, quick actions, and straightforward store information.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                to="/"
                variant="primary"
                className="rounded-xl border-[#D4AF37] bg-[#D4AF37] px-5 py-3 text-xs tracking-[0.18em] text-white hover:border-[#b89222] hover:bg-[#b89222]"
              >
                Back Home
              </Button>
              <Button
                to="/products"
                className="rounded-xl border-yellow-500/30 bg-zinc-900 px-5 py-3 text-xs tracking-[0.18em] text-white hover:border-yellow-400 hover:bg-zinc-800 hover:text-white"
              >
                Open Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="gold-silk-surface rounded-[2rem] border border-amber-500/25 px-6 py-8 shadow-[0_26px_80px_rgba(120,80,20,0.14)] sm:px-8 sm:py-10">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-800">
            Store Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Quick store blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:-translate-y-1">
            <p className="text-2xl font-bold text-yellow-400">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
              Items
            </p>
          </div>
          <div className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:-translate-y-1">
            <p className="text-2xl font-bold text-yellow-400">06</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
              Categories
            </p>
          </div>
          <div className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:-translate-y-1">
            <p className="text-2xl font-bold text-yellow-400">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
              Pickup Slots
            </p>
          </div>
          <div className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:-translate-y-1">
            <p className="text-2xl font-bold text-yellow-400">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700">
              Orders
            </p>
          </div>
        </div>
      </section>

      <section className="gold-silk-surface rounded-[2rem] border border-amber-500/25 px-6 py-8 shadow-[0_26px_80px_rgba(120,80,20,0.14)] sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-800">
              Store Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Stacked shopping wireframe</h2>

            <div className="mt-6 space-y-4">
              <article className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:border-amber-500/45">
                <h3 className="text-lg font-semibold text-zinc-900">Curated Catalog</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  Products are grouped by daily need so shoppers can scan faster.
                </p>
              </article>

              <article className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:border-amber-500/45">
                <h3 className="text-lg font-semibold text-zinc-900">Simple Checkout</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  Product pages keep price, stock, and action buttons easy to find.
                </p>
              </article>

              <article className="gold-glass-card rounded-[1.5rem] border p-5 transition hover:border-amber-500/45">
                <h3 className="text-lg font-semibold text-zinc-900">Pickup Ready</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700">
                  Store information stays direct for students who need quick order updates.
                </p>
              </article>
            </div>
          </div>

          <CategoryGridSection categories={categoryCards} />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
