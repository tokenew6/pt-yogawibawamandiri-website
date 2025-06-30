
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigationItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/tentang' },
    { name: t('nav.services'), path: '/layanan' },
    { name: t('nav.gallery'), path: '/galeri' },
    { name: t('nav.location'), path: '/lokasi' },
    { name: t('nav.contact'), path: '/kontak' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo PT. YWM */}
          <div className="flex items-center">
            <img 
              src="/ywm-logo-new.svg" 
              alt="PT. Yoga Wibawa Mandiri Logo"
              className="w-16 h-16 drop-shadow-lg"
            />
            <div className="ml-4">
              <h1 className="text-ywm-dark dark:text-white font-bold text-xl drop-shadow-sm">PT. Yoga Wibawa Mandiri</h1>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-medium drop-shadow-sm">Pengantongan Semen Padang Lhokseumawe</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-semibold transition-all duration-300 hover:text-ywm-red transform hover:scale-105 drop-shadow-sm ${
                  isActive(item.path) ? 'text-ywm-red border-b-2 border-ywm-red pb-1' : 'text-ywm-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Logo Semen Padang + Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle />
            <div className="flex items-center">
              <img 
                src="/semen-padang-logo-transparent.svg" 
                alt="Semen Padang Logo"
                className="w-16 h-16 drop-shadow-lg mr-4"
              />
              <div>
                <p className="text-ywm-dark dark:text-white font-bold text-lg drop-shadow-sm">Semen Padang</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm font-medium drop-shadow-sm">Mitra Resmi</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button + Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} className="text-ywm-dark dark:text-white" /> : <Menu size={24} className="text-ywm-dark dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 space-y-2 shadow-lg border border-gray-200">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-ywm-red hover:text-white ${
                    isActive(item.path) ? 'bg-ywm-red text-white' : 'text-ywm-dark hover:pl-6'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Logo Semen Padang */}
              <div className="flex items-center justify-center pt-4 border-t border-gray-200">
                <img 
                  src="/semen-padang-logo-transparent.svg" 
                  alt="Semen Padang Logo"
                  className="w-12 h-12 mr-3 drop-shadow-lg"
                />
                <div>
                  <p className="text-ywm-dark font-semibold text-sm drop-shadow-sm">Semen Padang</p>
                  <p className="text-gray-700 text-xs font-medium drop-shadow-sm">Mitra Resmi</p>
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
