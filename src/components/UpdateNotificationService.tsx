import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Download, X, RotateCcw } from 'lucide-react';

interface UpdateNotificationServiceProps {
  onUpdate?: () => void;
}

const UpdateNotificationService = ({ onUpdate }: UpdateNotificationServiceProps) => {
  const { t, i18n } = useTranslation();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check for service worker support
    if ('serviceWorker' in navigator) {
      // Register service worker and check for updates
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          setRegistration(reg);
          
          // Check for updates every 30 seconds
          setInterval(() => {
            reg.update();
          }, 30000);

          // Listen for new service worker waiting
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                  showUpdateNotification();
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
          setUpdateAvailable(true);
          showUpdateNotification();
        }
      });
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      return permission === 'granted';
    }
    return false;
  };

  const showUpdateNotification = () => {
    if (notificationPermission === 'granted') {
      const title = i18n.language === 'en' 
        ? 'PT. YWM - Update Available'
        : 'PT. YWM - Update Tersedia';
      
      const body = i18n.language === 'en'
        ? 'A new version of the website is available. Click to update.'
        : 'Versi baru website tersedia. Klik untuk update.';

      new Notification(title, {
        body,
        icon: '/ywm-logo-new.svg',
        badge: '/ywm-logo-new.svg',
        tag: 'update-available',
        requireInteraction: true,
        actions: [
          {
            action: 'update',
            title: i18n.language === 'en' ? 'Update Now' : 'Update Sekarang'
          },
          {
            action: 'dismiss',
            title: i18n.language === 'en' ? 'Later' : 'Nanti'
          }
        ]
      });
    }
  };

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
    setUpdateAvailable(false);
    onUpdate?.();
  };

  const dismissUpdate = () => {
    setUpdateAvailable(false);
  };

  // Enable push notifications
  const enablePushNotifications = async () => {
    if (!registration) return false;

    try {
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) return false;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'your-vapid-public-key' // You'll need to generate this
      });

      // Send subscription to your server
      console.log('Push subscription:', subscription);
      
      // Store subscription in localStorage for demo
      localStorage.setItem('push-subscription', JSON.stringify(subscription));
      
      return true;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return false;
    }
  };

  return (
    <>
      {/* Update Available Banner */}
      {updateAvailable && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-ywm-red text-white p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5" />
              <div>
                <p className="font-semibold">
                  {i18n.language === 'en' ? 'Update Available' : 'Update Tersedia'}
                </p>
                <p className="text-sm opacity-90">
                  {i18n.language === 'en' 
                    ? 'A new version of the website is ready'
                    : 'Versi baru website sudah siap'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleUpdate}
                variant="secondary"
                size="sm"
                className="bg-white text-ywm-red hover:bg-gray-100"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {i18n.language === 'en' ? 'Update Now' : 'Update Sekarang'}
              </Button>
              <Button 
                onClick={dismissUpdate}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Permission Request */}
      {notificationPermission === 'default' && (
        <Card className="fixed bottom-6 left-6 max-w-sm z-40 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-ywm-red" />
              <CardTitle className="text-sm">
                {i18n.language === 'en' ? 'Stay Updated' : 'Tetap Update'}
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              {i18n.language === 'en' 
                ? 'Get notified when new features are available'
                : 'Dapatkan notifikasi saat fitur baru tersedia'}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex space-x-2">
              <Button 
                onClick={enablePushNotifications}
                size="sm"
                className="flex-1 bg-ywm-red hover:bg-red-700"
              >
                {i18n.language === 'en' ? 'Enable' : 'Aktifkan'}
              </Button>
              <Button 
                onClick={() => setNotificationPermission('denied')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                {i18n.language === 'en' ? 'Later' : 'Nanti'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default UpdateNotificationService;
