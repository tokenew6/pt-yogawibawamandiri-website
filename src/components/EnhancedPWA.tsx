import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PWAInstallPromptProps {
  onInstall?: () => void;
  onDismiss?: () => void;
}

const EnhancedPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineNotice, setShowOfflineNotice] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = (window.navigator as any).standalone === true;
    setIsInstalled(isStandalone || isIOSStandalone);

    // Listen for beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install prompt after 30 seconds if not dismissed
      if (!localStorage.getItem('pwa-install-dismissed')) {
        setTimeout(() => setShowInstallPrompt(true), 30000);
      }
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Listen for online/offline status
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineNotice(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineNotice(true);
    };

    // Service worker update detection
    const handleServiceWorkerUpdate = () => {
      setUpdateAvailable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for service worker updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleServiceWorkerUpdate);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleServiceWorkerUpdate);
      }
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleUpdateApp = () => {
    window.location.reload();
  };

  const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ onInstall, onDismiss }) => (
    <AnimatePresence>
      {showInstallPrompt && !isInstalled && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-ywm-red to-red-600 rounded-xl flex items-center justify-center">
                  <Download className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Install Aplikasi
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    PT. Yoga Wibawa Mandiri
                  </p>
                </div>
              </div>
              <button
                onClick={onDismiss || handleDismissInstall}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Install aplikasi kami untuk akses yang lebih cepat dan pengalaman yang lebih baik. 
              Dapat digunakan offline dan mendapat notifikasi terbaru.
            </p>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <Smartphone size={16} />
                <span>Mobile</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <Monitor size={16} />
                <span>Desktop</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <WifiOff size={16} />
                <span>Offline</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onInstall || handleInstallClick}
                className="flex-1 bg-gradient-to-r from-ywm-red to-red-600 hover:from-red-600 hover:to-red-700 
                         text-white py-2 px-4 rounded-xl font-medium transition-all duration-200 
                         flex items-center justify-center space-x-2"
              >
                <Download size={18} />
                <span>Install</span>
              </button>
              <button
                onClick={onDismiss || handleDismissInstall}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 
                         transition-colors duration-200"
              >
                Nanti
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const OfflineNotice: React.FC = () => (
    <AnimatePresence>
      {showOfflineNotice && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 
                        rounded-xl p-4 flex items-center space-x-3">
            <WifiOff className="text-yellow-600 dark:text-yellow-400" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Mode Offline
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300">
                Beberapa fitur mungkin tidak tersedia tanpa koneksi internet
              </p>
            </div>
            <button
              onClick={() => setShowOfflineNotice(false)}
              className="p-1 hover:bg-yellow-100 dark:hover:bg-yellow-800 rounded-lg transition-colors"
            >
              <X size={16} className="text-yellow-600 dark:text-yellow-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const UpdateNotice: React.FC = () => (
    <AnimatePresence>
      {updateAvailable && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-4 right-4 z-50"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 
                        rounded-xl p-4 flex items-center space-x-3">
            <RefreshCw className="text-blue-600 dark:text-blue-400" size={20} />
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Update Tersedia
              </p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Versi baru aplikasi telah tersedia
              </p>
            </div>
            <button
              onClick={handleUpdateApp}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm 
                       transition-colors duration-200"
            >
              Update
            </button>
            <button
              onClick={() => setUpdateAvailable(false)}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-colors"
            >
              <X size={16} className="text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const ConnectionStatus: React.FC = () => (
    <div className="fixed bottom-4 right-4 z-40">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isOnline 
          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
          : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
      }`}>
        {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
        <span className="hidden sm:inline">
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <PWAInstallPrompt />
      <OfflineNotice />
      <UpdateNotice />
      <ConnectionStatus />
    </>
  );
};

export default EnhancedPWA;
