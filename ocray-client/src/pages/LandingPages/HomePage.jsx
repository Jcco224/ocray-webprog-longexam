import Button from '../../components/Button';
import banner from '../../assets/img/banner.png';
import dailyEssentialsImage from '../../assets/img/dailyess.jpg';
import studySuppliesImage from '../../assets/img/lace.png';
import campusApparelImage from '../../assets/img/sweatshirt.jpg';

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-8 bg-[linear-gradient(180deg,#f7f7fb_0%,#efeff7_100%)] px-4 py-4 sm:px-6 lg:px-8">
            <section className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y-4 border-yellow-500 bg-zinc-50 shadow-sm">
                <div className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-[linear-gradient(120deg,rgba(8,12,28,0.86),rgba(20,28,74,0.72))] sm:min-h-[calc(100vh-8rem)]">
                    <img
                        src={banner}
                        alt="BulldogEx banner"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,208,86,0.24),transparent_20%),linear-gradient(120deg,rgba(10,12,25,0.84),rgba(22,32,85,0.68))]" />
                    <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_left_center,rgba(0,0,0,0.3),transparent_52%)]" />
                    <div className="absolute right-[7%] top-[15%] hidden h-28 w-28 rounded-full border-[18px] border-yellow-500/25 border-l-transparent border-b-transparent sm:block" />
                    <div className="absolute right-[20%] top-[16%] hidden h-5 w-24 bg-yellow-500/25 lg:block" />
                    <div className="absolute right-[16%] top-[16%] hidden h-5 w-10 bg-yellow-500/25 lg:block" />
                    <div className="absolute right-[5%] top-[24%] hidden grid grid-cols-3 gap-2 sm:grid">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <span key={index} className="h-1.5 w-1.5 rounded-full bg-yellow-400/80" />
                        ))}
                    </div>

                    <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col items-start justify-center gap-12 px-6 py-10 sm:min-h-[calc(100vh-8rem)] sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16">
                        <div className="max-w-2xl text-left text-zinc-50">
                            <p className="inline-flex rounded-full border border-yellow-400/40 bg-zinc-950/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.38em] text-yellow-300 backdrop-blur">
                                New Semester Collection
                            </p>
                            <h1 className="mt-6 text-5xl font-bold leading-[0.92] sm:text-6xl lg:text-7xl">
                                Modern Campus
                                <span className="block text-yellow-400">Style Starts Here</span>
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100 sm:text-xl">
                                Explore official Bulldog Exchange apparel, student essentials, and
                                standout school merch in a cleaner, faster shopping experience.
                            </p>
                            <div className="mt-10 flex flex-row items-center justify-start gap-5">
                                <Button to="/products" variant="primary" className="px-10 py-5 text-base tracking-[0.24em] sm:px-12 sm:py-6 sm:text-lg">
                                    Shop Now
                                </Button>
                                <Button to="/about" variant="secondary" className="px-10 py-5 text-base tracking-[0.24em] sm:px-12 sm:py-6 sm:text-lg">
                                    About Store
                                </Button>
                            </div>

                            <div className="mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
                                <div className="rounded-[1.75rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur">
                                    <p className="text-3xl font-bold text-yellow-300">500+</p>
                                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-zinc-200">Orders Packed</p>
                                </div>
                                <div className="rounded-[1.75rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur">
                                    <p className="text-3xl font-bold text-yellow-300">10K+</p>
                                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-zinc-200">Student Shoppers</p>
                                </div>
                                <div className="rounded-[1.75rem] border border-white/15 bg-white/10 px-5 py-5 backdrop-blur">
                                    <p className="text-3xl font-bold text-yellow-300">50K+</p>
                                    <p className="mt-2 text-sm uppercase tracking-[0.22em] text-zinc-200">Campus Picks</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative hidden lg:block lg:shrink-0">
                            <div className="absolute -left-10 top-10 rounded-[1.5rem] border border-zinc-200/70 bg-white px-5 py-4 text-zinc-900 shadow-[0_20px_60px_rgba(7,10,26,0.28)]">
                                <p className="text-sm text-zinc-500">Featured Drop</p>
                                <p className="mt-1 text-2xl font-bold">Bulldog Essentials</p>
                            </div>
                            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_28px_90px_rgba(9,11,28,0.35)] backdrop-blur">
                                <img
                                    src={campusApparelImage}
                                    alt="Bulldog Exchange featured apparel"
                                    className="h-[28rem] w-[21rem] rounded-[1.5rem] object-cover xl:h-[32rem] xl:w-[25rem]"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-12 rounded-[1.5rem] border border-zinc-200/70 bg-white px-5 py-4 text-zinc-900 shadow-[0_20px_60px_rgba(7,10,26,0.28)]">
                                <p className="text-sm text-zinc-500">Best Price</p>
                                <p className="mt-1 text-2xl font-bold">PHP 499</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-yellow-500/30 bg-[linear-gradient(135deg,#050505_0%,#101010_55%,#181818_100%)] px-5 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-8 sm:py-10 lg:px-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.08),transparent_30%)]" />
                <div className="mb-6">
                    <p className="relative text-[11px] font-semibold uppercase tracking-[0.32em] text-yellow-300/80">
                        Store Overview
                    </p>
                    <h2 className="relative mt-3 text-3xl font-semibold text-white">Quick shopping blocks</h2>
                </div>

                <div className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-[1.75rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.26)]">
                        <p className="text-5xl font-black text-yellow-400">08</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
                            Products
                        </p>
                    </div>
                    <div className="rounded-[1.75rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.26)]">
                        <p className="text-5xl font-black text-yellow-400">06</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
                            Categories
                        </p>
                    </div>
                    <div className="rounded-[1.75rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.26)]">
                        <p className="text-5xl font-black text-yellow-400">24</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
                            Orders
                        </p>
                    </div>
                    <div className="rounded-[1.75rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.26)]">
                        <p className="text-5xl font-black text-yellow-400">03</p>
                        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-300">
                            Pickup Slots
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden rounded-[2rem] border border-yellow-500/30 bg-[linear-gradient(135deg,#060606_0%,#121212_58%,#1a1a1a_100%)] px-5 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:px-8 sm:py-10 lg:px-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.10),transparent_28%)]" />
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="relative text-[11px] font-semibold uppercase tracking-[0.32em] text-yellow-300/80">
                        Shop Sections
                    </p>
                        <h2 className="relative mt-3 text-3xl font-semibold text-white">Trending campus categories</h2>
                    </div>
                    <Button to="/products" variant="secondary" className="px-5 py-3 text-xs tracking-[0.24em]">
                        Explore All
                    </Button>
                </div>

                <div className="relative grid gap-6 xl:grid-cols-3">
                    <article className="group overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-4 shadow-[0_22px_48px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.34)]">
                        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900">
                            <img
                                src={dailyEssentialsImage}
                                alt="Daily essentials"
                                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-white">Daily Essentials</h3>
                            <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-950">
                                Best Seller
                            </span>
                        </div>
                        <p className="mt-3 text-base leading-7 text-zinc-300">
                            Bags, tumblers, lanyards, and items used every school day.
                        </p>
                        <Button to="/products" className="mt-6 px-5 py-3 text-xs tracking-[0.24em] border-yellow-500 bg-yellow-400 text-zinc-950 hover:bg-yellow-300" variant="primary">View Products</Button>
                    </article>

                    <article className="group overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-4 shadow-[0_22px_48px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.34)]">
                        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900">
                            <img
                                src={studySuppliesImage}
                                alt="Study supplies"
                                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-white">Study Supplies</h3>
                            <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-950">
                                Fresh Drop
                            </span>
                        </div>
                        <p className="mt-3 text-base leading-7 text-zinc-300">
                            Notes, desk tools, and study kits for class and review weeks.
                        </p>
                        <Button to="/products" className="mt-6 px-5 py-3 text-xs tracking-[0.24em] border-yellow-500 bg-yellow-400 text-zinc-950 hover:bg-yellow-300" variant="primary">Shop Supplies</Button>
                    </article>

                    <article className="group overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(24,24,27,0.96)_0%,rgba(9,9,11,0.98)_100%)] p-4 shadow-[0_22px_48px_rgba(0,0,0,0.28)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(0,0,0,0.34)]">
                        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900">
                            <img
                                src={campusApparelImage}
                                alt="Campus apparel"
                                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                            />
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-white">Campus Apparel</h3>
                            <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-950">
                                Limited
                            </span>
                        </div>
                        <p className="mt-3 text-base leading-7 text-zinc-300">
                            Comfortable pieces for class days, commute days, and weekends.
                        </p>
                        <Button to="/products" className="mt-6 px-5 py-3 text-xs tracking-[0.24em] border-yellow-500 bg-yellow-400 text-zinc-950 hover:bg-yellow-300" variant="primary">
                            View Apparel
                        </Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
