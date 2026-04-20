import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/img/images/NULOGO.png';
import bulldogVisual from '../assets/img/bannerdog.png';

const panelContent = {
  '/auth/signin': {
    headerLabel: 'Log In',
    titleTop: 'NU BULLDOG',
    titleBottom: 'EXCHANGE',
    body: 'Buy. Sell. Exchange.',
    accent: 'Just for Bulldogs.',
    ctaLabel: 'Sign Up',
    ctaTo: '/auth/signup',
  },
  '/auth/signup': {
    headerLabel: 'Sign Up',
    titleTop: 'JOIN THE',
    titleBottom: 'PACK',
    body: 'Create your Bulldog Exchange account.',
    accent: 'Campus gear starts here.',
    ctaLabel: 'Log In',
    ctaTo: '/auth/signin',
  },
};

const AuthLayout = () => {
  const location = useLocation();
  const content = panelContent[location.pathname] ?? panelContent['/auth/signin'];

  return (
    <section className="min-h-screen bg-[#050505] text-white">
      <div className="border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-4">
              <img src={logo} alt="NU Bulldog Exchange" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
              <div>
                <p className="text-lg font-black uppercase tracking-[0.08em] text-yellow-400 sm:text-2xl">
                  NU Bulldog
                </p>
                <p className="text-sm font-black uppercase tracking-[0.12em] text-white sm:text-xl">
                  Exchange
                </p>
              </div>
            </Link>
          </div>

          <a
            href="mailto:support@nubulldogexchange.com"
            className="text-sm font-medium text-yellow-300 transition hover:text-yellow-200 sm:text-base"
          >
            Need help?
          </a>
        </div>
      </div>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(217,163,46,0.14),transparent_32%),radial-gradient(circle_at_right_center,rgba(217,163,46,0.08),transparent_28%)]" />
        <div className="absolute inset-y-0 left-0 w-[46%] bg-[radial-gradient(circle_at_20%_40%,rgba(214,171,72,0.12),transparent_30%)]" />
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[radial-gradient(circle_at_50%_50%,rgba(247,196,74,0.18),transparent_50%)] opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(135deg,transparent_0%,rgba(220,170,55,0.24)_10%,transparent_25%,transparent_70%,rgba(220,170,55,0.24)_86%,transparent_100%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-[1600px] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
          <aside className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[2rem] border border-yellow-500/10 bg-[linear-gradient(145deg,rgba(11,11,11,0.96),rgba(20,20,20,0.84))] px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] lg:min-h-[720px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_35%,rgba(255,214,102,0.08),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.45))]" />
            <img
              src={bulldogVisual}
              alt=""
              className="absolute left-[-12%] top-1/2 hidden w-[72%] -translate-y-1/2 opacity-12 saturate-0 lg:block"
            />
            <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
              <img
                src={logo}
                alt="NU Bulldog Exchange logo"
                className="h-40 w-40 object-contain drop-shadow-[0_12px_30px_rgba(230,179,62,0.22)] sm:h-52 sm:w-52"
              />
              <div className="mt-8">
                <p className="text-4xl font-black uppercase tracking-[0.08em] text-yellow-400 sm:text-6xl">
                  {content.titleTop}
                </p>
                <p className="mt-2 text-3xl font-black uppercase tracking-[0.34em] text-white sm:text-5xl">
                  {content.titleBottom}
                </p>
              </div>
              <p className="mt-10 text-2xl font-medium text-zinc-100 sm:text-4xl">
                {content.body}
              </p>
              <p className="mt-3 text-2xl font-medium text-yellow-400 sm:text-4xl">
                {content.accent}
              </p>
            </div>
          </aside>

          <main className="relative flex items-center justify-center">
            <div className="w-full max-w-xl">
              <Outlet />
              {location.pathname === '/auth/signin' ? null : (
                <div className="mt-6 text-center text-sm text-zinc-400">
                  Already have an account?{' '}
                  <Link to={content.ctaTo} className="font-semibold text-yellow-300 transition hover:text-yellow-200">
                    {content.ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
