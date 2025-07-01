import Layout from '@/components/Layout';
import { useTranslation } from 'react-i18next';
import { Factory, Truck, Warehouse, Package, Award, Clock, Shield, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Factory,
      title: "Pengantongan Semen Otomatis",
      description: "Proses pengantongan dengan teknologi modern dan kapasitas hingga 500 ton per hari. Kontrol kualitas ketat untuk memastikan setiap kantong memenuhi standar Semen Padang.",
      features: ["Kapasitas 500 ton/hari", "Kualitas terjamin", "Penimbangan akurat", "Kemasan rapi"],
      price: "Mulai dari Rp 85.000/ton"
    },
    {
      icon: Truck,
      title: "Distribusi & Logistik",
      description: "Jaringan distribusi luas dengan armada transport handal. Melayani pengiriman ke seluruh Aceh dan Sumatera Utara dengan jadwal yang fleksibel.",
      features: ["Jangkauan luas", "Armada lengkap", "Tracking real-time", "Pengiriman tepat waktu"],
      price: "Sesuai jarak tempuh"
    },
    {
      icon: Warehouse,
      title: "Penyimpanan Warehouse",
      description: "Fasilitas penyimpanan modern dengan kapasitas besar dan sistem keamanan 24/7. Penyimpanan semen curah maupun kantong dalam kondisi optimal.",
      features: ["Kapasitas 10.000 ton", "Keamanan 24/7", "Kondisi optimal", "Akses mudah"],
      price: "Rp 15.000/ton/bulan"
    },
    {
      icon: Package,
      title: "Custom Packaging",
      description: "Layanan pengantongan khusus sesuai kebutuhan klien. Tersedia berbagai ukuran kemasan dari 25kg hingga 50kg dengan branding kustom.",
      features: ["Ukuran fleksibel", "Branding kustom", "Kualitas premium", "MOQ rendah"],
      price: "Konsultasi harga"
    }
  ];

  const certificates = [
    { name: "ISO 9001:2015", description: "Sistem Manajemen Kualitas" },
    { name: "ISO 14001:2015", description: "Sistem Manajemen Lingkungan" },
    { name: "OHSAS 18001", description: "Keselamatan dan Kesehatan Kerja" },
    { name: "Sertifikat SNI", description: "Standar Nasional Indonesia" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-ywm-red to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">
            {t('nav.services')} Kami
          </h1>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in">
            Solusi Lengkap Pengantongan dan Distribusi Semen dengan Teknologi Modern
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ywm-dark dark:text-white mb-4">
              Layanan <span className="text-ywm-red">Unggulan</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Kami menyediakan berbagai layanan berkualitas tinggi untuk memenuhi kebutuhan industri konstruksi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-ywm-red rounded-lg flex items-center justify-center">
                      <service.icon className="text-white" size={32} />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-ywm-dark dark:text-white">{service.title}</CardTitle>
                      <p className="text-ywm-red font-semibold">{service.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ywm-dark dark:text-white">Keunggulan:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Award className="text-ywm-red mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/order">
              <Button className="bg-ywm-red hover:bg-red-700 text-white px-8 py-4 text-lg">
                Pesan Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ywm-dark dark:text-white mb-4">
              Mengapa Memilih <span className="text-ywm-red">PT. YWM?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-ywm-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark dark:text-white mb-4">Pengalaman 15+ Tahun</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Berpengalaman melayani kebutuhan konstruksi dengan track record yang terpercaya
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-ywm-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark dark:text-white mb-4">Kualitas Terjamin</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Produk berkualitas tinggi sesuai standar Semen Padang dengan sertifikasi ISO
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-ywm-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark dark:text-white mb-4">Teknologi Modern</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Menggunakan teknologi terdepan untuk efisiensi dan akurasi proses produksi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ywm-dark dark:text-white mb-4">
              Sertifikasi & <span className="text-ywm-red">Standar Kualitas</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Berkomitmen pada standar kualitas internasional
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <Card key={index} className="text-center dark:bg-gray-800">
                <CardContent className="pt-6">
                  <Award className="w-12 h-12 text-ywm-red mx-auto mb-4" />
                  <h3 className="font-semibold text-ywm-dark dark:text-white mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-ywm-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Butuh Konsultasi Khusus?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tim ahli kami siap membantu Anda menentukan solusi terbaik untuk kebutuhan proyek Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/kontak">
              <Button className="bg-white text-ywm-red hover:bg-gray-100 px-8 py-4 text-lg">
                Hubungi Sales
              </Button>
            </Link>
            <Link to="/order">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-ywm-red px-8 py-4 text-lg">
                Buat Pesanan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
