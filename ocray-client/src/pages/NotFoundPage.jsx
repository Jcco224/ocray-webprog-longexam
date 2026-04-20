import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="w-full border-b border-yellow-700/30 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-500 bg-gradient-to-br from-yellow-400 to-yellow-700 text-lg font-extrabold text-black shadow-lg shadow-yellow-700/20">
              NU
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-wide">
                <span className="text-yellow-500">NU</span>{' '}
                <span className="text-white">BULLDOG</span>{' '}
                <span className="text-yellow-500">EXCHANGE</span>
              </h1>
              <p className="text-sm text-zinc-400">Buy. Sell. Exchange. Just for Bulldogs.</p>
            </div>
          </div>

          <Link to="/" className="font-medium text-yellow-400 transition hover:text-yellow-300">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(234,179,8,0.12),_transparent_28%)]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-28 top-20 h-96 w-96 rounded-full border border-yellow-500/30" />
          <div className="absolute bottom-0 right-0 h-[32rem] w-[32rem] rounded-full border border-yellow-500/20" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-81px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-300">
              Error 404
            </div>

            <div className="space-y-4">
              <h2 className="text-6xl font-black leading-none tracking-tight md:text-7xl">
                <span className="text-yellow-500">Page</span> Not Found
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                The page you are looking for does not exist, may have been moved, or is only
                available to verified NU Bulldog Exchange users.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/"
                className="rounded-2xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400 shadow-lg shadow-yellow-700/20"
              >
                Go to Homepage
              </Link>
              <Link
                to="/auth/signin"
                className="rounded-2xl border border-yellow-500/40 px-6 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-500/10"
              >
                Log In Again
              </Link>
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 rounded-full bg-yellow-500/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-yellow-500/25 bg-zinc-950/90 p-8 shadow-2xl shadow-black/60 md:p-10">
                <div className="mb-8 flex items-center justify-center">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-yellow-500 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 text-5xl font-black text-black shadow-xl shadow-yellow-700/20">
                    404
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <div className="mx-auto h-2 w-24 rounded-full bg-yellow-500/70" />
                  <h3 className="text-3xl font-extrabold text-white">Lost in the Exchange?</h3>
                  <p className="leading-relaxed text-zinc-400">
                    Try checking the URL, return to the homepage, or sign in to continue
                    browsing marketplace listings, student deals, and campus exchanges.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
