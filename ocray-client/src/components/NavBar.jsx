import { NavLink } from 'react-router-dom';
import logo from '../assets/img/images/NULOGO.png';

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
      ? 'border-yellow-500 bg-yellow-500 text-zinc-950'
      : 'border-transparent text-yellow-400 hover:border-yellow-500 hover:bg-zinc-950 hover:text-yellow-300',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-yellow-500 bg-zinc-950/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-6 px-3 py-5 sm:px-4 sm:py-6 lg:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="BulldogEx" className="h-12 w-12 rounded-full border-2 border-yellow-500 bg-zinc-50 object-contain sm:h-14 sm:w-14" />
          <div className="space-y-0.5">
            <p className="text-2xl font-bold text-yellow-400 sm:text-3xl">BulldogEx Shop</p>
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
            {authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="rounded-full border-2 border-yellow-500 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-yellow-400 transition hover:bg-yellow-500 hover:text-zinc-950"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
