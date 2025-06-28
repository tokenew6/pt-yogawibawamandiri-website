
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const navigationItems = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Galeri', path: '/galeri' },
    { name: 'Lokasi', path: '/lokasi' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <footer className="bg-ywm-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-ywm-red rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">YWM</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">PT. Yoga Wibawa Mandiri</h3>
                <p className="text-gray-300 text-sm">Pengantongan Semen Padang</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Perusahaan pengantongan Semen Padang terpercaya di Lhokseumawe dengan 
              fasilitas modern dan distribusi yang luas di seluruh Aceh dan Sumatera Utara.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-ywm-red rounded flex items-center justify-center">
                <span className="text-white text-xs">SP</span>
              </div>
              <span className="text-gray-300 text-sm">Partner Resmi Semen Padang</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-ywm-red transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-ywm-red mt-1" size={16} />
                <div>
                  <p className="text-gray-300 text-sm">Kantor Pusat:</p>
                  <p className="text-gray-300 text-sm">Medan, Sumatera Utara</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-ywm-red mt-1" size={16} />
                <div>
                  <p className="text-gray-300 text-sm">Pabrik:</p>
                  <p className="text-gray-300 text-sm">Pelabuhan Krueng Geukueh, Lhokseumawe</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-ywm-red" size={16} />
                <p className="text-gray-300 text-sm">+62 651 123456</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-ywm-red" size={16} />
                <p className="text-gray-300 text-sm">info@ywm.co.id</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-ywm-red" size={16} />
                <p className="text-gray-300 text-sm">Senin - Jumat: 08:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 PT. Yoga Wibawa Mandiri. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
