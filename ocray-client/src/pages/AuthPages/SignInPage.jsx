import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-yellow-500/20 bg-zinc-100 px-5 py-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-yellow-500 focus:bg-white';

const actionButtonClassName = 'w-full rounded-full border-yellow-500 bg-zinc-950 py-4 text-[11px] tracking-[0.28em] text-yellow-400 hover:bg-black hover:text-yellow-300';

const SignInPage = () => {
  return (
    <>
      <div className="rounded-[2rem] border border-yellow-500/20 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-yellow-600">
          Sign In
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Welcome Back</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          Log in to continue shopping official NU Bulldog essentials, review orders, and manage your pickup details.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/20 bg-zinc-100 font-semibold text-zinc-900 transition hover:border-yellow-500 hover:text-yellow-600">
            f
          </button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/20 bg-zinc-100 font-semibold text-zinc-900 transition hover:border-yellow-500 hover:text-yellow-600">
            G
          </button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/20 bg-zinc-100 font-semibold text-zinc-900 transition hover:border-yellow-500 hover:text-yellow-600">
            in
          </button>
        </div>

        <form className="mt-8 space-y-5">
          <div>
            <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
              Email Address
            </label>
            <input
              id="signin-email"
              type="email"
              placeholder="student@email.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className={inputClasses}
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              It must be a combination of minimum 8 letters, numbers, and symbols.
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-zinc-600">
              <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-yellow-500" />
              <span>Remember me</span>
            </label>
            <button type="button" className="font-medium text-zinc-700 transition hover:text-yellow-600">
              Forgot Password?
            </button>
          </div>

          <Button type="submit" variant="primary" className={actionButtonClassName}>
            Log In
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" className="w-full rounded-full border-yellow-500/20 bg-zinc-100 py-4 text-[11px] tracking-[0.24em] text-zinc-900 hover:border-yellow-500 hover:bg-yellow-50">
              Log In with Google
            </Button>
            <Button type="button" variant="secondary" className="w-full rounded-full border-yellow-500/20 bg-zinc-100 py-4 text-[11px] tracking-[0.24em] text-zinc-900 hover:border-yellow-500 hover:bg-yellow-50">
              Log In with Apple
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          No account yet?{' '}
          <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-yellow-600">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
