
import { useState } from 'react';
import Layout from '@/components/Layout';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission (you can integrate with Formspree or other service)
    console.log('Form submitted:', formData);
    
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih atas pesan Anda. Tim kami akan segera menghubungi Anda kembali.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-ywm-red to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in">Hubungi Kami</h1>
          <p className="text-xl max-w-3xl mx-auto animate-fade-in">
            Silakan hubungi kami untuk konsultasi, pemesanan, atau informasi lebih lanjut
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-ywm-dark mb-6">
                Kirim <span className="text-ywm-red">Pesan</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Isi formulir di bawah ini dan tim kami akan menghubungi Anda dalam waktu 24 jam.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ywm-dark mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ywm-red focus:border-ywm-red transition-colors"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ywm-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ywm-red focus:border-ywm-red transition-colors"
                      placeholder="nama@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-ywm-dark mb-2">
                      No. Telepon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ywm-red focus:border-ywm-red transition-colors"
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-ywm-dark mb-2">
                      Perusahaan
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ywm-red focus:border-ywm-red transition-colors"
                      placeholder="Nama perusahaan (opsional)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ywm-dark mb-2">
                    Subjek *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ywm-red focus:border-ywm-red transition-colors"
                  >
                    <option value="">Pilih subjek pesan</option>
                    <option value="pemesanan">Pemesanan Semen</option>
                    <option value="konsultasi">Konsultasi Teknis</option>
                    <option value="kemitraan">Kemitraan Bisnis</option>
                    <option value="informasi">Informasi Umum</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ywm-dark mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ywm-red focus:border-ywm-red transition-colors"
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-ywm-red text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Kirim Pesan</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-in-right">
              <h2 className="text-3xl font-bold text-ywm-dark mb-6">
                Informasi <span className="text-ywm-red">Kontak</span>
              </h2>

              <div className="space-y-6">
                {/* Kantor Pusat */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-ywm-dark mb-4">Kantor Pusat</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-ywm-red mt-1" size={20} />
                      <div>
                        <p className="text-gray-700">
                          Jl. Gatot Subroto No. 123<br />
                          Medan, Sumatera Utara 20112
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-ywm-red" size={20} />
                      <p className="text-gray-700">+62 61 456789</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="text-ywm-red" size={20} />
                      <p className="text-gray-700">info@ywm.co.id</p>
                    </div>
                  </div>
                </div>

                {/* Pabrik */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-ywm-dark mb-4">Pabrik Pengantongan</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-ywm-red mt-1" size={20} />
                      <div>
                        <p className="text-gray-700">
                          Pelabuhan Krueng Geukueh<br />
                          Lhokseumawe, Aceh 24352
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-ywm-red" size={20} />
                      <p className="text-gray-700">+62 651 123456</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="text-ywm-red" size={20} />
                      <p className="text-gray-700">pabrik@ywm.co.id</p>
                    </div>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="bg-ywm-red text-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Jam Operasional</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Clock size={20} />
                      <div>
                        <p className="font-medium">Senin - Jumat</p>
                        <p className="text-gray-200">08:00 - 17:00 WIB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={20} />
                      <div>
                        <p className="font-medium">Sabtu</p>
                        <p className="text-gray-200">08:00 - 12:00 WIB</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={20} />
                      <div>
                        <p className="font-medium">Minggu</p>
                        <p className="text-gray-200">Tutup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-ywm-dark mb-4">
              Kontak <span className="text-ywm-red">Darurat</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Untuk keperluan mendesak di luar jam operasional
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-3">
                <Phone className="text-ywm-red" size={24} />
                <div className="text-left">
                  <p className="font-semibold text-ywm-dark">Hotline 24 Jam</p>
                  <p className="text-gray-600">+62 851 xxxx xxxx</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-ywm-red" size={24} />
                <div className="text-left">
                  <p className="font-semibold text-ywm-dark">Email Darurat</p>
                  <p className="text-gray-600">emergency@ywm.co.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
