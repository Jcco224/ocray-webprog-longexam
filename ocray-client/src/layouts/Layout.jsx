import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  const { pathname } = useLocation();
  const isAdminWorkspace = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAdminWorkspace) {
    return (
      <div className="min-h-screen bg-slate-100 text-zinc-900">
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="gold-silk-page flex min-h-screen flex-col text-zinc-900">
      <NavBar />
      <main className="flex-1 pb-0 pt-36 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
