import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-3 w-full rounded-2xl border border-white/15 bg-[#080808] px-5 py-4 text-base text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400 focus:bg-[#0f0f0f]';

const actionButtonClassName =
  'w-full rounded-2xl border-[#d7ab4b] bg-[#d7ab4b] py-4 text-lg tracking-[0.08em] text-black hover:bg-[#efc966] hover:border-[#efc966]';

const SignInPage = () => {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(8,8,8,0.96),rgba(12,12,12,0.9))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8 lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Log In</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
            Use your username and password to access your NU Bulldog Exchange account.
          </p>
        </div>
        <div className="hidden rounded-2xl border border-yellow-400/70 px-5 py-4 text-right text-sm font-semibold text-yellow-300 md:block">
          Username
          <br />
          Password
        </div>
      </div>

      <form className="mt-10 space-y-6">
        <div>
          <label htmlFor="signin-username" className="text-sm font-medium text-zinc-300">
            Username
          </label>
          <input
            id="signin-username"
            type="text"
            placeholder="Enter your username"
            autoComplete="username"
            className={inputClasses}
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="signin-password" className="text-sm font-medium text-zinc-300">
              Password
            </label>
            <button type="button" className="text-sm font-medium text-yellow-300 transition hover:text-yellow-200">
              Forgot Password
            </button>
          </div>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className={inputClasses}
          />
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Log In
        </Button>

        <p className="border-t border-white/10 pt-6 text-center text-sm leading-7 text-zinc-400">
          By logging in, you agree to NU Bulldog Exchange&apos;s{' '}
          <button type="button" className="font-medium text-yellow-300 transition hover:text-yellow-200">
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="font-medium text-yellow-300 transition hover:text-yellow-200">
            Privacy Policy
          </button>
          .
        </p>

        <div className="text-center text-sm text-zinc-400">
          New to NU Bulldog Exchange?{' '}
          <Link to="/auth/signup" className="font-semibold text-yellow-300 transition hover:text-yellow-200">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
