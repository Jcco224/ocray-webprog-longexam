import { Link } from 'react-router-dom';
import logo from '../assets/img/images/NULOGO.png';

const quickLinks = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Products', '/products'],
  ['My Orders', '/products'],
];

const serviceLinks = ['FAQs', 'Shipping & Delivery', 'Returns & Refunds', 'Terms & Conditions'];

const Footer = () => (
  <footer className="mt-auto border-t border-yellow-500/25 !bg-black px-6 py-10 text-white sm:px-8 lg:px-12">
    <div className="mx-auto grid w-full max-w-[1400px] gap-10 border-b border-white/10 pb-9 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.1fr_1.2fr]">
      <section>
        <div className="flex items-center gap-3">
          <img src={logo} alt="BulldogEx" className="h-12 w-12 rounded-full border border-yellow-500/50 bg-white object-contain" />
          <div>
            <p className="text-xl font-bold">BulldogEx <span className="text-yellow-500">Shop</span></p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-zinc-400">Official Campus Store</p>
          </div>
        </div>
        <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-300">
          Your trusted campus store for premium picks and everyday essentials.
        </p>
        <div className="mt-5 flex gap-2">
          {['f', '◎', '♪', '✉'].map((item) => (
            <span key={item} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-xs text-white">{item}</span>
          ))}
        </div>
      </section>

      <nav aria-label="Quick links">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-500">Quick Links</p>
        <div className="mt-5 flex flex-col gap-3">
          {quickLinks.map(([label, to]) => <Link key={label} to={to} className="text-sm text-zinc-300 transition hover:text-white">{label}</Link>)}
        </div>
      </nav>

      <nav aria-label="Customer service">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-500">Customer Service</p>
        <div className="mt-5 flex flex-col gap-3">
          {serviceLinks.map((label) => <span key={label} className="text-sm text-zinc-300">{label}</span>)}
        </div>
      </nav>

      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-500">Contact Us</p>
        <div className="mt-5 space-y-4 text-sm leading-6 text-zinc-300">
          <p>☎ +63 912 345 6789</p>
          <p>✉ support@bulldogex.com</p>
          <p>⌖ 123 Campus Avenue,<br />City, Philippines</p>
        </div>
      </section>

      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-500">Newsletter</p>
        <p className="mt-5 text-sm leading-6 text-zinc-300">Subscribe to get updates on new arrivals and exclusive offers.</p>
        <form className="mt-5 flex overflow-hidden rounded-lg border border-white/15 bg-white/5" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input id="footer-email" type="email" placeholder="Enter your email" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500" />
          <button type="submit" className="bg-yellow-500 px-5 font-bold text-white transition hover:bg-yellow-400" aria-label="Subscribe">➤</button>
        </form>
      </section>
    </div>

    <p className="mx-auto max-w-[1400px] pt-6 text-center text-xs text-zinc-500">© 2026 BulldogEx Shop. All rights reserved.</p>
  </footer>
);

export default Footer;
