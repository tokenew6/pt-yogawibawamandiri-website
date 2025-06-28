
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Galeri', path: '/galeri' },
    { name: 'Lokasi', path: '/lokasi' },
    { name: 'Kontak', path: '/kontak' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logos */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-ywm-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YWM</span>
              </div>
              <div className="ml-3">
                <h1 className="text-ywm-dark font-semibold text-lg">PT. Yoga Wibawa Mandiri</h1>
                <p className="text-gray-600 text-sm">Pengantongan Semen Padang</p>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-ywm-red font-bold text-xs">SP</span>
            </div>
            <div>
              <p className="text-ywm-dark font-semibold text-sm">Semen Padang</p>
              <p className="text-gray-600 text-xs">Partner Resmi</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors hover:text-ywm-red ${
                  isActive(item.path) ? 'text-ywm-red border-b-2 border-ywm-red pb-1' : 'text-ywm-dark'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 font-medium transition-colors hover:text-ywm-red ${
                  isActive(item.path) ? 'text-ywm-red' : 'text-ywm-dark'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
