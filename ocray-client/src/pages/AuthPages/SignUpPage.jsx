import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { registerAccount, saveToken } from '../../services/api';

const inputClasses =
  'mt-2 w-full rounded-2xl border border-white/15 bg-[#080808] px-5 py-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-500 focus:bg-[#0f0f0f]';

const actionButtonClassName = 'w-full rounded-full border-yellow-500 bg-yellow-500 py-4 text-[11px] tracking-[0.28em] hover:bg-yellow-400';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const handleChange = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      const result = await registerAccount(form);
      saveToken(result.token);
      navigate('/products');
    } catch (error) {
      setStatus({ loading: false, error: error.message });
    }
  };

  return (
    <>
      <div className="rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(8,8,8,0.96),rgba(12,12,12,0.9))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.5)] sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-yellow-400">
          Create Account
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Join BulldogEx</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-400">
          Create your account for faster checkout, order updates, and a cleaner way to shop official NU Bulldog merch.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/30 bg-zinc-900 font-semibold text-white transition hover:border-yellow-500 hover:bg-zinc-800">
            f
          </button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/30 bg-zinc-900 font-semibold text-white transition hover:border-yellow-500 hover:bg-zinc-800">
            G
          </button>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-yellow-500/30 bg-zinc-900 font-semibold text-white transition hover:border-yellow-500 hover:bg-zinc-800">
            in
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="text-sm font-medium text-zinc-300">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="First name"
                autoComplete="given-name"
                className={inputClasses}
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="last-name" className="text-sm font-medium text-zinc-300">
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
                className={inputClasses}
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-username" className="text-sm font-medium text-zinc-300">
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="bulldog.student"
              autoComplete="username"
              className={inputClasses}
              value={form.username}
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
            id="signup-email"
            name="email"
              type="email"
              placeholder="student@email.com"
              autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={handleChange}
            required
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="text-sm font-medium text-zinc-300">
              Password
            </label>
            <input
            id="signup-password"
            name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            className={inputClasses}
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
            />
            <p className="mt-2 text-xs leading-5 text-zinc-400">
              Use a secure password with letters, numbers, and symbols.
            </p>
          </div>

          {status.error && <p role="alert" className="rounded-xl bg-red-950/60 p-3 text-sm text-red-200">{status.error}</p>}

          <Button type="submit" variant="primary" className={actionButtonClassName} disabled={status.loading}>
            {status.loading ? 'Creating Account...' : 'Sign Up'}
          </Button>

          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <Button type="button" variant="secondary" className="w-full rounded-full border-yellow-500/30 bg-zinc-900 py-4 text-[11px] tracking-[0.24em] hover:border-yellow-500 hover:bg-zinc-800">
              Sign Up with Google
            </Button>
            <Button type="button" variant="secondary" className="w-full rounded-full border-yellow-500/30 bg-zinc-900 py-4 text-[11px] tracking-[0.24em] hover:border-yellow-500 hover:bg-zinc-800">
              Sign Up with Apple
            </Button>
          </div>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
          Already have an account?{' '}
          <Link to="/auth/signin" className="font-semibold text-yellow-300 transition hover:text-yellow-200">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
