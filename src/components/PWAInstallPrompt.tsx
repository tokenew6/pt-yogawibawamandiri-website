import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode
    const isStandaloneMode = window.navigator.standalone || 
                            window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(isStandaloneMode);

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a delay if not already installed
      if (!isStandaloneMode) {
        setTimeout(() => {
          setShowInstallPrompt(true);
        }, 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    const handleAppInstalled = () => {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed successfully');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Error during PWA installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed, dismissed, or no prompt available
  if (isStandalone || 
      sessionStorage.getItem('pwa-prompt-dismissed') || 
      (!deferredPrompt && !isIOS) || 
      !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 max-w-sm mx-auto">
      <Card className="shadow-2xl border-2 border-ywm-red bg-white dark:bg-gray-800">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-ywm-red rounded-lg flex items-center justify-center">
                <Download className="text-white" size={20} />
              </div>
              <div>
                <CardTitle className="text-lg">
                  {t('language') === 'en' ? 'Install App' : 'Install Aplikasi'}
                </CardTitle>
                <CardDescription className="text-sm">
                  {t('language') === 'en' 
                    ? 'Add PT. YWM to your home screen' 
                    : 'Tambahkan PT. YWM ke layar utama'}
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {t('language') === 'en' 
                ? 'Quick access to orders, AI assistant, and company info'
                : 'Akses cepat ke pesanan, asisten AI, dan info perusahaan'}
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs text-gray-500">
                <Smartphone className="mr-1" size={12} />
                {t('language') === 'en' ? 'Works offline' : 'Bekerja offline'}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Monitor className="mr-1" size={12} />
                {t('language') === 'en' ? 'Fast loading' : 'Loading cepat'}
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {t('language') === 'en' 
                    ? 'To install: Tap Share button and "Add to Home Screen"'
                    : 'Untuk install: Tap tombol Share dan "Tambah ke Layar Utama"'}
                </div>
                <Button 
                  onClick={handleDismiss}
                  className="w-full bg-ywm-red hover:bg-red-700"
                >
                  {t('language') === 'en' ? 'Got it' : 'Mengerti'}
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleDismiss}
                  className="flex-1"
                >
                  {t('language') === 'en' ? 'Maybe later' : 'Nanti saja'}
                </Button>
                <Button 
                  onClick={handleInstallClick}
                  className="flex-1 bg-ywm-red hover:bg-red-700"
                >
                  {t('language') === 'en' ? 'Install' : 'Install'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
