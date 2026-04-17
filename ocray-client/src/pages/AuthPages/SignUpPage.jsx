import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-yellow-500/20 bg-zinc-100 px-5 py-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-yellow-500 focus:bg-white';

const actionButtonClassName = 'w-full rounded-full border-yellow-500 bg-zinc-950 py-4 text-[11px] tracking-[0.28em] text-yellow-400 hover:bg-black hover:text-yellow-300';

const SignUpPage = () => {
  return (
    <>
      <div className="rounded-[2rem] border border-yellow-500/20 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-yellow-600">
          Create Account
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Join BulldogEx</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          Create your account for faster checkout, order updates, and a cleaner way to shop official NU Bulldog merch.
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
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="First name"
                autoComplete="given-name"
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="student@email.com"
              autoComplete="email"
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className={inputClasses}
            />
            <p className="mt-2 text-xs leading-5 text-zinc-500">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>

          <Button type="submit" variant="primary" className={actionButtonClassName}>
            Sign Up
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" className="w-full rounded-full border-yellow-500/20 bg-zinc-100 py-4 text-[11px] tracking-[0.24em] text-zinc-900 hover:border-yellow-500 hover:bg-yellow-50">
              Sign Up with Google
            </Button>
            <Button type="button" variant="secondary" className="w-full rounded-full border-yellow-500/20 bg-zinc-100 py-4 text-[11px] tracking-[0.24em] text-zinc-900 hover:border-yellow-500 hover:bg-yellow-50">
              Sign Up with Apple
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
          Already have an account?{' '}
          <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-yellow-600">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
