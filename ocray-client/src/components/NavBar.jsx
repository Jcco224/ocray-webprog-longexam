import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/images/NULOGO.png';
import { clearToken, getCurrentUser, getToken } from '../services/api.js';
import CartModal from './CartModal.jsx';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
];

const authLinks = [
  { label: 'Login', to: '/auth/signin' },
  { label: 'Signup', to: '/auth/signup' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-yellow-500 bg-yellow-500 text-white'
      : 'border-transparent text-white hover:border-yellow-500 hover:bg-zinc-900 hover:text-white',
  ].join(' ');

const NavBar = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => (getToken() ? getCurrentUser() : null));
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const updateSession = () => setCurrentUser(getToken() ? getCurrentUser() : null);
    updateSession();
    window.addEventListener('storage', updateSession);
    window.addEventListener('bulldogex-session-change', updateSession);
    return () => {
      window.removeEventListener('storage', updateSession);
      window.removeEventListener('bulldogex-session-change', updateSession);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    setCurrentUser(null);
    navigate('/auth/signin');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-yellow-500 bg-zinc-950/95 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="BulldogEx" className="h-11 w-11 rounded-full border-2 border-yellow-500 bg-zinc-50 object-contain sm:h-12 sm:w-12" />
          <div className="space-y-0.5">
            <p className="text-xl font-bold text-yellow-400 sm:text-2xl">BulldogEx Shop</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
              Official Campus Store
            </p>
          </div>
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          <nav className="flex items-center gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-2 flex items-center gap-2">
            {currentUser ? (
              <>
                <NavLink
                  to="/profile"
                  className="rounded-full border-2 border-yellow-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-yellow-500 hover:text-white"
                >
                  Profile
                </NavLink>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="rounded-full border-2 border-yellow-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-yellow-500 hover:text-white"
                >
                  Cart
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full border-2 border-yellow-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-yellow-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              authLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="rounded-full border-2 border-yellow-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-yellow-500 hover:text-white"
                >
                  {link.label}
                </NavLink>
              ))
            )}
          </div>
        </div>
      </div>
      <nav aria-label="Mobile navigation" className="flex gap-2 overflow-x-auto px-3 pb-4 md:hidden">
        {[...links, ...(currentUser ? [] : authLinks)].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className="shrink-0 rounded-full border border-yellow-500/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
          >
            {link.label}
          </NavLink>
        ))}
        {currentUser && (
          <>
            <NavLink
              to="/profile"
              className="shrink-0 rounded-full border border-yellow-500/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Profile
            </NavLink>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="shrink-0 rounded-full border border-yellow-500/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Cart
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 rounded-full border border-yellow-500/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Logout
            </button>
          </>
        )}
      </nav>
      <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default NavBar;
