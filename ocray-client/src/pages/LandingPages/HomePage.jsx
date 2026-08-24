import Button from '../../components/Button';

const stats = [
  { value: '08', label: 'Products', icon: 'bag' },
  { value: '06', label: 'Categories', icon: 'grid' },
  { value: '24', label: 'Orders', icon: 'clipboard' },
  { value: '03', label: 'Pickup Slots', icon: 'pin' },
];

const categories = [
  { label: 'Apparel', icon: 'shirt' },
  { label: 'Bags & Accessories', icon: 'backpack' },
  { label: 'Stationery', icon: 'book' },
];

function LineIcon({ name, className = 'h-8 w-8' }) {
  const paths = {
    bag: <><path d="M7 9h10l1 11H6L7 9Z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    clipboard: <><path d="M9 5H6v16h12V5h-3" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 11h6M9 15h6" /></>,
    pin: <><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    shirt: <path d="m8 4-5 3 2 5 3-1v9h8v-9l3 1 2-5-5-3c-.7 1.4-2 2-4 2S8.7 5.4 8 4Z" />,
    backpack: <><path d="M7 9V7a5 5 0 0 1 10 0v2" /><rect x="5" y="8" width="14" height="13" rx="3" /><path d="M8 14h8M9 8V6h6v2" /></>,
    book: <><path d="M4 5c3-1 5 0 8 2v14c-3-2-5-3-8-2V5Z" /><path d="M20 5c-3-1-5 0-8 2v14c3-2 5-3 8-2V5Z" /></>,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const HomePage = () => (
  <div className="w-full bg-[#eef2f7] px-3 py-4 sm:px-5 lg:px-8">
    <div className="mx-auto flex max-w-[1500px] flex-col gap-4">
      <section className="gold-silk-surface relative min-h-[310px] overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_12px_34px_rgba(25,45,80,0.1)] sm:min-h-[350px]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.8)_34%,rgba(255,255,255,0.15)_70%)]" />
        <div className="relative flex min-h-[310px] max-w-xl flex-col justify-center px-8 py-12 sm:min-h-[350px] sm:px-16 lg:px-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.38em] text-amber-700">Welcome to</p>
          <h1 className="mt-3 text-5xl font-black leading-none tracking-tight text-[#071a40] sm:text-6xl">
            BulldogEx <span className="text-amber-600">Shop</span>
          </h1>
          <div className="mt-5 h-0.5 w-10 bg-amber-600" />
          <p className="mt-5 max-w-sm text-base leading-7 text-slate-600 sm:text-lg">
            Your official campus store for premium picks and everyday essentials.
          </p>
          <Button to="/products" variant="secondary" className="mt-6 w-fit border-[#071a40] bg-[#071a40] px-8 py-3 text-[11px] tracking-[0.2em] hover:bg-[#102b5c]">
            Shop Now <span aria-hidden="true" className="ml-3 text-amber-400">→</span>
          </Button>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/80 bg-white/90 px-5 py-5 shadow-[0_10px_28px_rgba(25,45,80,0.08)] sm:px-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-amber-700">Store Overview</p>
        <h2 className="mt-1 text-2xl font-bold text-[#071a40]">Quick shopping blocks</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article key={stat.label} className="flex items-center gap-5 rounded-[1.25rem] border border-slate-200/80 bg-white px-4 py-4 shadow-[0_8px_20px_rgba(25,45,80,0.08)] transition hover:-translate-y-0.5 hover:border-amber-400/50">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-amber-600/20 bg-[linear-gradient(145deg,#fff8e9,#f5f7fb)] text-amber-600 shadow-sm">
                <LineIcon name={stat.icon} />
              </div>
              <div>
                <p className="text-4xl font-black text-amber-600">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/80 bg-white/90 px-5 py-5 shadow-[0_10px_28px_rgba(25,45,80,0.08)] sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-amber-700">Shop Sections</p>
            <h2 className="mt-1 text-2xl font-bold text-[#071a40]">Trending campus categories</h2>
          </div>
          <Button to="/products" variant="secondary" className="border-amber-600/60 bg-[#071a40] px-6 py-3 text-[10px] tracking-[0.18em] hover:bg-[#102b5c]">
            Explore All <span aria-hidden="true" className="ml-3 text-amber-400">→</span>
          </Button>
        </div>

        <div className="mt-4 grid gap-5 lg:grid-cols-3">
          {categories.map((category) => (
            <article key={category.label} className="gold-silk-surface relative flex min-h-40 flex-col items-center justify-center overflow-hidden rounded-[1.25rem] border border-slate-200/80 px-6 py-7 text-[#071a40] shadow-[0_8px_20px_rgba(25,45,80,0.08)]">
              <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#071a40] text-amber-400">✦</div>
              <LineIcon name={category.icon} className="h-16 w-16" />
              <h3 className="mt-3 text-sm font-black uppercase tracking-[0.16em]">{category.label}</h3>
              <div className="mt-3 h-0.5 w-10 bg-amber-500" />
            </article>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default HomePage;
