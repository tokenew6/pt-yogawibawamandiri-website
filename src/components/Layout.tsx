import { ReactNode } from 'react';
import ModernHeader from './ModernHeader';
import Footer from './Footer';
import ChatBot from './ChatBot';
import VoiceAIAssistant from './VoiceAIAssistant';
import PWAInstallPrompt from './PWAInstallPrompt';
import UpdateNotificationService from './UpdateNotificationService';
import EnhancedPWA from './EnhancedPWA';
import FloatingActionButton from './FloatingActionButton';
import { PageTransition } from './ModernAnimations';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-gray-50 via-white to-gray-100 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <ModernHeader />
      <main className="relative">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <ChatBot />
      <VoiceAIAssistant />
      <PWAInstallPrompt />
      <UpdateNotificationService />
      <EnhancedPWA />
      <FloatingActionButton />
    </div>
  );
};

export default Layout;