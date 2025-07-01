import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Download, ShoppingCart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import SmartSearch from './SmartSearch';
import NotificationSystem, { Notification } from './NotificationSystem';
import { HoverScale, MagneticHover } from './ModernAnimations';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const location = useLocation();
  const { t } = useTranslation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: t('nav.home'), path: '/', icon: null },
    { name: t('nav.about'), path: '/tentang', icon: null },
    { name: t('nav.services'), path: '/layanan', icon: null },
    { name: t('nav.gallery'), path: '/galeri', icon: null },
    { name: t('nav.location'), path: '/lokasi', icon: MapPin },
    { name: t('nav.contact'), path: '/kontak', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Initialize sample notifications
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: '1',
        type: 'info',
        title: 'Website Diperbarui!',
        message: 'Fitur-fitur modern telah ditambahkan untuk pengalaman yang lebih baik',
        timestamp: new Date(),
        read: false
      },
      {
        id: '2',
        type: 'success',
        title: 'Layanan Baru',
        message: 'Distribusi ekspres kini tersedia untuk wilayah Aceh dan Sumut',
        timestamp: new Date(Date.now() - 3600000),
        read: false,
        action: {
          label: 'Lihat Detail',
          onClick: () => window.location.href = '/layanan'
        }
      }
    ];
    setNotifications(sampleNotifications);
  }, []);

  // Notification handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Contact functions
  const handlePhoneCall = () => {
    window.open('tel:+6282304433145', '_self');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@yogawibawamandiri.com', '_self');
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=Pelabuhan+Krueng+Geukueh+Lhokseumawe', '_blank');
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0KPj4KZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMTc4CiUlRU9G';
    link.download = 'PT-YWM-Company-Profile.pdf';
    link.click();
  };

  const handleCartClick = () => {
    window.location.href = '/order';
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-white/20 dark:border-gray-700/50' 
          : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Top Bar with Contact Info */}
      <motion.div 
        className="bg-gradient-to-r from-ywm-red via-red-600 to-red-700 text-white py-2 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <HoverScale>
                <button 
                  onClick={handlePhoneCall}
                  className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200"
                >
                  <Phone size={14} />
                  <span>+62 823-0443-3145</span>
                </button>
              </HoverScale>
              <HoverScale>
                <button 
                  onClick={handleEmailClick}
                  className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200"
                >
                  <Mail size={14} />
                  <span>info@yogawibawamandiri.com</span>
                </button>
              </HoverScale>
              <HoverScale>
                <button 
                  onClick={handleLocationClick}
                  className="flex items-center space-x-2 hover:text-yellow-300 transition-colors duration-200"
                >
                  <MapPin size={14} />
                  <span>Lhokseumawe, Aceh</span>
                </button>
              </HoverScale>
            </div>
            <div className="flex items-center space-x-4">
              <motion.span 
                className="text-yellow-300"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📈 Status: Operasional 24/7
              </motion.span>
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <MagneticHover>
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <motion.img 
                  src="/ywm-logo-modern.svg" 
                  alt="PT. Yoga Wibawa Mandiri Logo"
                  className="w-14 h-14 drop-shadow-2xl dark:filter dark:brightness-0 dark:invert"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-ywm-red/20 to-transparent rounded-full blur"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="ml-4">
                <motion.h1 
                  className="text-ywm-dark dark:text-white font-bold text-xl drop-shadow-sm"
                  whileHover={{ color: '#dc2626' }}
                  transition={{ duration: 0.3 }}
                >
                  PT. Yoga Wibawa Mandiri
                </motion.h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Pengantongan Semen Padang • Lhokseumawe
                </p>
              </div>
            </Link>
          </MagneticHover>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SmartSearch placeholder="Cari layanan, produk, informasi..." />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                              hover:bg-ywm-red/10 hover:text-ywm-red transform hover:scale-105 
                              flex items-center space-x-2 relative overflow-hidden ${
                      isActive(item.path) 
                        ? 'bg-ywm-red text-white shadow-lg' 
                        : 'text-ywm-dark dark:text-gray-300'
                    }`}
                  >
                    {IconComponent && <IconComponent size={16} />}
                    <span>{item.name}</span>
                    {isActive(item.path) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Notifications */}
            <NotificationSystem
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismiss}
              onClearAll={handleClearAll}
            />

            {/* Download Brochure */}
            <HoverScale>
              <button
                onClick={handleDownloadBrochure}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                         hover:from-blue-600 hover:to-blue-700 transition-all duration-300
                         flex items-center space-x-2 shadow-lg"
              >
                <Download size={16} />
                <span className="hidden xl:inline">Brosur</span>
              </button>
            </HoverScale>

            {/* Shopping Cart */}
            <HoverScale>
              <button
                onClick={handleCartClick}
                className="relative p-2 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 
                         dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                <ShoppingCart size={20} />
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white rounded-full 
                            text-xs flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  0
                </motion.div>
              </button>
            </HoverScale>

            {/* User Profile */}
            <HoverScale>
              <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red 
                               hover:text-white transition-all duration-300">
                <User size={20} />
              </button>
            </HoverScale>

            {/* Theme & Language Toggle */}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-300 dark:border-gray-600">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Semen Padang Logo */}
            <motion.div 
              className="flex items-center pl-2 border-l border-gray-300 dark:border-gray-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img 
                src="/semen-padang-logo-transparent.svg" 
                alt="Semen Padang Logo"
                className="w-12 h-12 drop-shadow-lg dark:filter dark:brightness-0 dark:invert"
              />
              <div className="ml-2">
                <p className="text-ywm-dark dark:text-white font-bold text-sm">Semen Padang</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">Mitra Resmi</p>
              </div>
            </motion.div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <HoverScale>
              <button
                onClick={handleCartClick}
                className="relative p-2 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 
                         dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                <ShoppingCart size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </button>
            </HoverScale>

            <ThemeToggle />
            <LanguageToggle />
            
            <motion.button
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red hover:text-white 
                       transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    exit={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Search & Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pb-4 space-y-4">
                {/* Mobile Search */}
                <div className="px-2">
                  <SmartSearch placeholder="Cari..." className="w-full" />
                </div>
                
                {/* Mobile Navigation */}
                <nav className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 space-y-3 
                              shadow-2xl border border-white/20 dark:border-gray-700/50">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          className={`flex items-center space-x-3 py-3 px-4 rounded-xl font-semibold 
                                    transition-all duration-300 hover:bg-ywm-red hover:text-white transform hover:scale-105 ${
                            isActive(item.path) ? 'bg-ywm-red text-white shadow-lg' : 'text-ywm-dark dark:text-gray-300'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {IconComponent && <IconComponent size={20} />}
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                  
                  {/* Mobile Action Buttons */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
                    <motion.button
                      onClick={handlePhoneCall}
                      className="w-full flex items-center space-x-3 py-3 px-4 rounded-xl 
                               bg-green-500 text-white hover:bg-green-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Phone size={20} />
                      <span>Hubungi Kami</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={handleDownloadBrochure}
                      className="w-full flex items-center space-x-3 py-3 px-4 rounded-xl 
                               bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download size={20} />
                      <span>Download Brosur</span>
                    </motion.button>
                  </div>

                  {/* Mobile Semen Padang Logo */}
                  <div className="flex items-center justify-center pt-4 border-t border-gray-200 dark:border-gray-600">
                    <img 
                      src="/semen-padang-logo-transparent.svg" 
                      alt="Semen Padang Logo"
                      className="w-10 h-10 mr-3 drop-shadow-lg dark:filter dark:brightness-0 dark:invert"
                    />
                    <div>
                      <p className="text-ywm-dark dark:text-white font-semibold text-sm">Semen Padang</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">Mitra Resmi</p>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default ModernHeader;
