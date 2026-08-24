import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
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
