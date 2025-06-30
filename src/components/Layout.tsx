import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import VoiceAIAssistant from './VoiceAIAssistant';
import PWAInstallPrompt from './PWAInstallPrompt';
import UpdateNotificationService from './UpdateNotificationService';

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
      <VoiceAIAssistant />
      <PWAInstallPrompt />
      <UpdateNotificationService />
    </div>
  );
};

export default Layout;