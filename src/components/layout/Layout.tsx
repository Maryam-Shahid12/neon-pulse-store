import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartSlideout from '@/components/cart/CartSlideout';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
      <CartSlideout />
    </div>
  );
};

export default Layout;