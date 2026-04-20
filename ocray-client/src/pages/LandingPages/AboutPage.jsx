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
  <section className="rounded-[2rem] border border-yellow-500/15 bg-[linear-gradient(180deg,#090909_0%,#111111_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-8 sm:py-10">
    <div className="text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-yellow-400/80">
        Category Grid
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
        Shop by category
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
        Explore official NU Bulldog Exchange picks through a cleaner, faster category view.
      </p>
    </div>

    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to="/products"
          className="group flex h-full min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#121212] transition duration-300 hover:-translate-y-1 hover:border-yellow-500/35 hover:shadow-[0_18px_35px_rgba(212,175,55,0.16)]"
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
              <h3 className="text-xl font-semibold text-white transition group-hover:text-yellow-300">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-400">
                {category.itemCount} {category.itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>

            <span className="mt-6 inline-flex w-fit rounded-full border border-yellow-500/20 bg-yellow-500/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-yellow-300">
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
        className="rounded-xl border-[#D4AF37] bg-[#D4AF37] px-6 py-3 text-sm tracking-[0.18em] text-black hover:border-[#b89222] hover:bg-[#b89222]"
      >
        View Products
      </Button>
    </div>
  </section>
);

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 bg-[#050505] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-[linear-gradient(135deg,#0a0a0a_0%,#111111_48%,#090909_100%)] shadow-[0_26px_80px_rgba(0,0,0,0.38)]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:items-center lg:px-10">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-yellow-500/15 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.14),transparent_42%),#151515] p-6">
            <div className="absolute -left-14 bottom-0 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,#1b1b1b_0%,#111111_100%)]">
              <img
                src={logo}
                alt="BulldogEx"
                className="h-32 w-32 rounded-full border-2 border-yellow-500/35 bg-black object-contain shadow-[0_12px_30px_rgba(212,175,55,0.18)]"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-400/80">
              About Store
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              A campus shop focused on useful products and simple ordering.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
              BulldogEx Shop keeps the low-fidelity layout system while presenting clear
              product categories, quick actions, and straightforward store information.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                to="/"
                variant="primary"
                className="rounded-xl border-[#D4AF37] bg-[#D4AF37] px-5 py-3 text-xs tracking-[0.18em] text-black hover:border-[#b89222] hover:bg-[#b89222]"
              >
                Back Home
              </Button>
              <Button
                to="/products"
                className="rounded-xl border-yellow-500/30 bg-transparent px-5 py-3 text-xs tracking-[0.18em] text-yellow-300 hover:border-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-200"
              >
                Open Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-yellow-500/20 bg-[linear-gradient(180deg,#0b0b0b_0%,#121212_100%)] px-6 py-8 shadow-[0_26px_80px_rgba(0,0,0,0.3)] sm:px-8 sm:py-10">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-400/80">
            Store Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Quick store blocks</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:-translate-y-1 hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
            <p className="text-2xl font-bold text-yellow-400">08</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Items
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:-translate-y-1 hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
            <p className="text-2xl font-bold text-yellow-400">06</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Categories
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:-translate-y-1 hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
            <p className="text-2xl font-bold text-yellow-400">03</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Pickup Slots
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:-translate-y-1 hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
            <p className="text-2xl font-bold text-yellow-400">24</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
              Orders
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-yellow-500/20 bg-[linear-gradient(180deg,#090909_0%,#111111_100%)] px-6 py-8 shadow-[0_26px_80px_rgba(0,0,0,0.3)] sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-400/80">
              Store Flow
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Stacked shopping wireframe</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
                <h3 className="text-lg font-semibold text-white">Curated Catalog</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Products are grouped by daily need so shoppers can scan faster.
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
                <h3 className="text-lg font-semibold text-white">Simple Checkout</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Product pages keep price, stock, and action buttons easy to find.
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-yellow-500/18 bg-[#151515] p-5 transition hover:border-yellow-500/35 hover:shadow-[0_16px_32px_rgba(212,175,55,0.14)]">
                <h3 className="text-lg font-semibold text-white">Pickup Ready</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
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
