
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Search, Bell, User, ShoppingCart, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    // Create a dummy PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0KPj4KZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMTc4CiUlRU9G';
    link.download = 'PT-YWM-Company-Profile.pdf';
    link.click();
  };

  const handleCartClick = () => {
    // Navigate to order page
    window.location.href = '/order';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
      // For now, just navigate to services page
      window.location.href = '/layanan';
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-white/20 dark:border-gray-700/50' 
        : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-lg'
    }`}>
      {/* Top Bar with Contact Info */}
      <div className="bg-gradient-to-r from-ywm-red via-red-600 to-red-700 text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <button 
                onClick={handlePhoneCall}
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors"
              >
                <Phone size={14} />
                <span>+62 823-0443-3145</span>
              </button>
              <button 
                onClick={handleEmailClick}
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors"
              >
                <Mail size={14} />
                <span>info@yogawibawamandiri.com</span>
              </button>
              <button 
                onClick={handleLocationClick}
                className="flex items-center space-x-2 hover:text-yellow-300 transition-colors"
              >
                <MapPin size={14} />
                <span>Lhokseumawe, Aceh</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-yellow-300">📈 Status: Operasional 24/7</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section - New Modern Design */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <img 
                src="/ywm-logo-modern.svg" 
                alt="PT. Yoga Wibawa Mandiri Logo"
                className="w-14 h-14 transition-all duration-300 group-hover:scale-110 drop-shadow-2xl
                          dark:filter dark:brightness-0 dark:invert"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-ywm-red/20 to-transparent 
                            rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="ml-4">
              <h1 className="text-ywm-dark dark:text-white font-bold text-xl group-hover:text-ywm-red 
                           transition-colors duration-300 drop-shadow-sm">
                PT. Yoga Wibawa Mandiri
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Pengantongan Semen Padang • Lhokseumawe
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 
                            hover:bg-ywm-red/10 hover:text-ywm-red transform hover:scale-105 
                            flex items-center space-x-2 ${
                    isActive(item.path) 
                      ? 'bg-ywm-red text-white shadow-lg' 
                      : 'text-ywm-dark dark:text-gray-300'
                  }`}
                >
                  {IconComponent && <IconComponent size={16} />}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red hover:text-white 
                         transition-all duration-300 transform hover:scale-110"
              >
                <Search size={20} />
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-2xl 
                              shadow-2xl border border-gray-200 dark:border-gray-700 p-4 z-50">
                  <form onSubmit={handleSearch}>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari produk, layanan..."
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                                 focus:ring-2 focus:ring-ywm-red focus:border-ywm-red outline-none
                                 dark:bg-gray-700 dark:text-white"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-ywm-red text-white rounded-xl hover:bg-red-700 
                                 transition-colors"
                      >
                        <Search size={16} />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red 
                             hover:text-white transition-all duration-300 transform hover:scale-110">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* Download Brochure */}
            <button
              onClick={handleDownloadBrochure}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl 
                       hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105
                       flex items-center space-x-2 shadow-lg"
            >
              <Download size={16} />
              <span className="hidden xl:inline">Brosur</span>
            </button>

            {/* Shopping Cart */}
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 
                       dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 
                       transform hover:scale-110"
            >
              <ShoppingCart size={20} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white rounded-full 
                            text-xs flex items-center justify-center">0</div>
            </button>

            {/* User Profile */}
            <button className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red 
                             hover:text-white transition-all duration-300 transform hover:scale-110">
              <User size={20} />
            </button>

            {/* Theme & Language Toggle */}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-300 dark:border-gray-600">
              <ThemeToggle />
              <LanguageToggle />
            </div>

            {/* Semen Padang Logo - Redesigned */}
            <div className="flex items-center pl-2 border-l border-gray-300 dark:border-gray-600">
              <img 
                src="/semen-padang-logo-transparent.svg" 
                alt="Semen Padang Logo"
                className="w-12 h-12 drop-shadow-lg transition-all duration-300 hover:scale-110
                          dark:filter dark:brightness-0 dark:invert"
              />
              <div className="ml-2">
                <p className="text-ywm-dark dark:text-white font-bold text-sm">Semen Padang</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">Mitra Resmi</p>
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red hover:text-white 
                       transition-all duration-300"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={handleCartClick}
              className="relative p-2 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 
                       dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300"
            >
              <ShoppingCart size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </button>

            <ThemeToggle />
            <LanguageToggle />
            
            <button
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-ywm-red hover:text-white 
                       transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk, layanan..."
                className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 
                         focus:ring-2 focus:ring-ywm-red focus:border-ywm-red outline-none
                         dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-ywm-red text-white rounded-xl hover:bg-red-700 transition-colors"
              >
                <Search size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 animate-fade-in">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-6 space-y-3 
                          shadow-2xl border border-white/20 dark:border-gray-700/50">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
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
                );
              })}
              
              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
                <button
                  onClick={handlePhoneCall}
                  className="w-full flex items-center space-x-3 py-3 px-4 rounded-xl 
                           bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <Phone size={20} />
                  <span>Hubungi Kami</span>
                </button>
                
                <button
                  onClick={handleDownloadBrochure}
                  className="w-full flex items-center space-x-3 py-3 px-4 rounded-xl 
                           bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  <Download size={20} />
                  <span>Download Brosur</span>
                </button>
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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
