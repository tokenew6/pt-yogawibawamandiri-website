
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

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
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-ywm-red to-red-700 rounded-xl flex items-center justify-center shadow-lg mr-4">
                <div className="text-white font-bold">
                  <div className="text-lg leading-none">YWM</div>
                  <div className="text-xs opacity-90">PT</div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl">PT. Yoga Wibawa Mandiri</h3>
                <p className="text-gray-300 text-sm">Pengantongan Semen Padang Lhokseumawe</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Perusahaan pengantongan Semen Padang terpercaya di Lhokseumawe dengan 
              fasilitas modern dan distribusi yang luas di seluruh Aceh dan Sumatera Utara.
            </p>
            
            {/* Partnership Badge */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-xs">SP</div>
              </div>
              <span className="text-gray-300 text-sm font-medium">Mitra Resmi Semen Padang</span>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-ywm-red rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-ywm-red rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-ywm-red rounded-lg flex items-center justify-center hover:bg-red-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-ywm-red">Navigasi</h4>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-ywm-red">Kontak Kami</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-ywm-red mt-1" size={18} />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Kantor Pusat:</p>
                  <p className="text-gray-300 text-sm">Medan, Sumatera Utara</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-ywm-red mt-1" size={18} />
                <div>
                  <p className="text-gray-300 text-sm font-medium">Pabrik:</p>
                  <p className="text-gray-300 text-sm">Pelabuhan Krueng Geukueh<br />Lhokseumawe, Aceh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-ywm-red" size={18} />
                <p className="text-gray-300 text-sm">+62 651 123456</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-ywm-red" size={18} />
                <p className="text-gray-300 text-sm">info@ywm.co.id</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="text-ywm-red" size={18} />
                <p className="text-gray-300 text-sm">Senin - Jumat: 08:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2024 PT. Yoga Wibawa Mandiri. Semua hak cipta dilindungi.
            </p>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-xs">
                Developed by <span className="text-ywm-red font-medium">Mulky Malikul Dhaher</span>
              </p>
              <p className="text-gray-400 text-xs">
                Engineer of PT. Yoga Wibawa Mandiri
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
