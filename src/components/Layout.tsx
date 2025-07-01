import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatBot from './ChatBot';
import VoiceAIAssistant from './VoiceAIAssistant';
import PWAInstallPrompt from './PWAInstallPrompt';
import UpdateNotificationService from './UpdateNotificationService';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-gray-50 via-white to-gray-100 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <Header />
      <main className="relative">
        {children}
      </main>
      <Footer />
      <ChatBot />
      <VoiceAIAssistant />
      <PWAInstallPrompt />
      <UpdateNotificationService />
    </div>
  );
};

export default Layout;