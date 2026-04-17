import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/img/nubdexchange_logo.png';
import bulldogVisual from '../assets/img/bannerdog.png';

const panelContent = {
  '/auth/signin': {
    eyebrow: 'Welcome Back',
    title: 'Log back in and pick up where your campus shopping left off.',
    body: 'Review orders, save essentials, and keep your favorite NU Bulldog merch one tap away.',
    ctaLabel: 'Create Account',
    ctaTo: '/auth/signup',
  },
  '/auth/signup': {
    eyebrow: 'Join BulldogEx',
    title: 'Create your account and unlock a stronger NU campus store experience.',
    body: 'Get faster checkout, track orders, and browse black-and-gold campus picks built for students.',
    ctaLabel: 'Log In',
    ctaTo: '/auth/signin',
  },
};

const AuthLayout = () => {
  const location = useLocation();
  const content = panelContent[location.pathname] ?? panelContent['/auth/signin'];

  return (
    <section className="min-h-screen bg-[linear-gradient(135deg,#040404_0%,#111111_55%,#1a1a1a_100%)] px-4 py-6 text-zinc-900 sm:px-6 lg:px-8 lg:py-8">
      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl overflow-hidden rounded-[2.5rem] border border-yellow-500/25 bg-zinc-50 shadow-[0_32px_120px_rgba(0,0,0,0.42)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(250,204,21,0.10),transparent_30%)]" />

        <aside className="relative hidden lg:flex lg:w-[44%] lg:flex-col lg:justify-between lg:overflow-hidden lg:bg-[linear-gradient(180deg,#0b0b0b_0%,#171717_100%)] lg:p-10">
          <div className="absolute -left-16 bottom-[-5rem] h-64 w-64 rounded-full bg-yellow-400/14 blur-3xl" />
          <div className="absolute right-[-3rem] top-[-3rem] h-48 w-48 rounded-full border-[18px] border-yellow-400/20 border-l-transparent border-b-transparent" />
          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-4">
              <img src={logo} alt="BulldogEx Shop" className="h-16 w-16 rounded-full border-2 border-yellow-500 bg-zinc-50 object-contain" />
              <div>
                <p className="text-3xl font-black text-yellow-400">BulldogEx Shop</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-zinc-400">
                  Official Campus Store
                </p>
              </div>
            </Link>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.34em] text-yellow-300">
              {content.eyebrow}
            </p>
            <h1 className="mt-6 text-5xl font-black leading-[0.95] text-white">
              {content.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-300">
              {content.body}
            </p>
            <Link
              to={content.ctaTo}
              className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-yellow-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-400 transition hover:bg-yellow-500 hover:text-zinc-950"
            >
              {content.ctaLabel}
            </Link>
          </div>

          <div className="relative flex items-end justify-between gap-6">
            <div className="max-w-[10rem] rounded-[1.5rem] border border-yellow-500/20 bg-zinc-900/80 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-400">Campus Pick</p>
              <p className="mt-3 text-2xl font-black text-yellow-400">NU Bulldog</p>
              <p className="mt-2 text-sm leading-6 text-zinc-300">
                Strong identity, official merch, and a sharper student storefront.
              </p>
            </div>
            <img
              src={bulldogVisual}
              alt="NU Bulldog visual"
              className="h-[23rem] w-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </aside>

        <main className="relative flex w-full items-center justify-center px-6 py-10 sm:px-10 lg:w-[56%] lg:px-14">
          <div className="w-full max-w-2xl">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-3">
                <img src={logo} alt="BulldogEx Shop" className="h-12 w-12 rounded-full border-2 border-yellow-500 bg-zinc-50 object-contain" />
                <div>
                  <p className="text-2xl font-black text-zinc-950">BulldogEx Shop</p>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                    Official Campus Store
                  </p>
                </div>
              </Link>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
