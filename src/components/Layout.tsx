import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen font-poppins bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;