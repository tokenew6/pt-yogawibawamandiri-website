import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Award, Users, Bot, Zap, Star, Shield, Clock, Globe, Phone, Mail, MapPin, Play, Download, ShoppingCart, TrendingUp, CheckCircle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEOHead, { pageSEO } from '@/components/SEOHead';
import { trackEvent } from '@/components/GoogleAnalytics';
import { useState, useEffect } from 'react';

const Index = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    experience: 0,
    tons: 0,
    clients: 0,
    coverage: 0
  });

  // Animation for hero slides
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Pengantongan Semen Berkualitas Tinggi",
      subtitle: "Teknologi Modern, Kualitas Terpercaya"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Distribusi Terluas di Aceh & Sumut",
      subtitle: "Jangkauan Nasional, Pelayanan Prima"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Mitra Resmi Semen Padang",
      subtitle: "Kepercayaan dan Kualitas Sejak 2008"
    }
  ];

  // Slide animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animated counter effect
  useEffect(() => {
    const targets = { experience: 15, tons: 500, clients: 1200, coverage: 50 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setAnimatedNumbers({
        experience: Math.floor(targets.experience * progress),
        tons: Math.floor(targets.tons * progress),
        clients: Math.floor(targets.clients * progress),
        coverage: Math.floor(targets.coverage * progress)
      });

      if (step >= steps) {
        clearInterval(interval);
        setAnimatedNumbers(targets);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);
  
  const handleCTAClick = (action: string) => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      event_label: action,
      page: 'home'
    });
  };

  const handlePhoneCall = () => {
    window.open('tel:+6282304433145', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/6282304433145?text=Halo,%20saya%20tertarik%20dengan%20produk%20PT.%20Yoga%20Wibawa%20Mandiri', '_blank');
  };

  const handleVideoPlay = () => {
    // Open company profile video
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };
  
  return (
    <Layout>
      <SEOHead 
        title={pageSEO.home[t.language as 'id' | 'en']?.title}
        description={pageSEO.home[t.language as 'id' | 'en']?.description}
        keywords={pageSEO.home[t.language as 'id' | 'en']?.keywords}
      />
      {/* Revolutionary Hero Section with Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            >
              <img 
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-ywm-red/40 to-black/80"></div>
            </div>
          ))}
        </div>

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Dynamic Content Based on Current Slide */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600/90 to-purple-600/90 
                          backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-pulse">
              <Sparkles size={20} className="text-yellow-300" />
              <span className="text-sm font-medium">AI-Powered Smart Factory | Industry 4.0</span>
              <Bot size={20} className="text-cyan-300" />
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </span>
          </h1>
          
          <p className="text-xl md:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            {heroSlides[currentSlide].subtitle}
          </p>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button
              onClick={handlePhoneCall}
              className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                       text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                       transform hover:scale-110 flex items-center space-x-3 shadow-2xl hover:shadow-green-500/30"
            >
              <Phone size={24} className="group-hover:animate-bounce" />
              <span>Hubungi Sekarang</span>
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
            </button>

            <button
              onClick={handleWhatsApp}
              className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 
                       text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                       transform hover:scale-110 flex items-center space-x-3 shadow-2xl hover:shadow-emerald-500/30"
            >
              <Globe size={24} className="group-hover:animate-bounce" />
              <span>WhatsApp</span>
            </button>

            <Link 
              to="/order" 
              className="group bg-gradient-to-r from-ywm-red to-red-600 hover:from-red-600 hover:to-red-700 
                       text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                       transform hover:scale-110 flex items-center space-x-3 shadow-2xl hover:shadow-red-500/30"
              onClick={() => handleCTAClick('order_now')}
            >
              <ShoppingCart size={24} className="group-hover:animate-bounce" />
              <span>Pesan Sekarang</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {/* Quick Access Floating Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={handleVideoPlay}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 
                       rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 
                       border border-white/20 hover:border-white/40"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              <span>Tonton Video</span>
            </button>

            <Link
              to="/lokasi"
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 
                       rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 
                       border border-white/20 hover:border-white/40"
            >
              <MapPin size={18} className="group-hover:scale-110 transition-transform" />
              <span>Lihat Lokasi</span>
            </Link>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFsgMyAwIFIgXQovQ291bnQgMQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDIgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUgODQyIF0KPj4KZW5kb2JqCnhyZWYKMCA0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDA1OCAwMDAwMCBuIAowMDAwMDAwMTE1IDAwMDAwIG4gCnRyYWlsZXIKPDwKL1NpemUgNAovUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKMTc4CiUlRU9G';
                link.download = 'PT-YWM-Company-Profile.pdf';
                link.click();
              }}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 
                       rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 
                       border border-white/20 hover:border-white/40"
            >
              <Download size={18} className="group-hover:scale-110 transition-transform" />
              <span>Download Brosur</span>
            </a>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section with Animated Counters */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-ywm-dark dark:text-white mb-4">
              Pencapaian <span className="bg-gradient-to-r from-ywm-red to-red-600 bg-clip-text text-transparent">Terbaik</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Dedikasi dan komitmen kami dalam memberikan pelayanan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Experience */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                          transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700
                          hover:border-ywm-red/20 animate-fade-in">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-ywm-red to-red-600 rounded-2xl 
                              flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300
                              shadow-lg group-hover:shadow-red-500/30">
                  <Clock className="text-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full 
                              flex items-center justify-center animate-pulse">
                  <Star size={14} className="text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                {animatedNumbers.experience}+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Tahun Pengalaman</p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-ywm-red to-red-600 h-2 rounded-full w-4/5 
                              animate-pulse"></div>
              </div>
            </div>

            {/* Production Capacity */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                          transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700
                          hover:border-blue-500/20 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl 
                              flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300
                              shadow-lg group-hover:shadow-blue-500/30">
                  <Factory className="text-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full 
                              flex items-center justify-center animate-pulse">
                  <TrendingUp size={14} className="text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                {animatedNumbers.tons}K+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Ton per Tahun</p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-5/6 
                              animate-pulse"></div>
              </div>
            </div>

            {/* Clients */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                          transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700
                          hover:border-green-500/20 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl 
                              flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300
                              shadow-lg group-hover:shadow-green-500/30">
                  <Users className="text-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full 
                              flex items-center justify-center animate-pulse">
                  <CheckCircle size={14} className="text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                {animatedNumbers.clients}+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Klien Puas</p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-full 
                              animate-pulse"></div>
              </div>
            </div>

            {/* Coverage Area */}
            <div className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                          transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700
                          hover:border-purple-500/20 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl 
                              flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300
                              shadow-lg group-hover:shadow-purple-500/30">
                  <Globe className="text-white" size={36} />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full 
                              flex items-center justify-center animate-pulse">
                  <MapPin size={14} className="text-white" />
                </div>
              </div>
              <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                {animatedNumbers.coverage}+
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Kota Jangkauan</p>
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full w-3/4 
                              animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Additional Stats Bar */}
          <div className="mt-16 bg-gradient-to-r from-ywm-red via-red-600 to-red-700 rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex items-center justify-center space-x-4">
                <Shield size={32} className="text-yellow-300" />
                <div>
                  <h4 className="text-2xl font-bold">ISO 9001:2015</h4>
                  <p className="text-red-100">Sertifikat Kualitas</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Clock size={32} className="text-green-300" />
                <div>
                  <h4 className="text-2xl font-bold">24/7</h4>
                  <p className="text-red-100">Operasional</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Bot size={32} className="text-cyan-300" />
                <div>
                  <h4 className="text-2xl font-bold">AI Support</h4>
                  <p className="text-red-100">Customer Service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-ywm-dark mb-6">
                Tentang <span className="text-ywm-red">PT. Yoga Wibawa Mandiri</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Didirikan sebagai mitra strategis Semen Padang di wilayah Aceh dan Sumatera Utara, 
                PT. Yoga Wibawa Mandiri telah menjadi perusahaan pengantongan semen terpercaya 
                dengan fasilitas modern di Pelabuhan Krueng Geukueh, Lhokseumawe.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Dengan komitmen terhadap kualitas dan pelayanan prima, kami melayani kebutuhan 
                konstruksi di seluruh wilayah dengan distribusi yang efisien dan tepat waktu.
              </p>
              
              {/* Developer Credit */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                <p className="text-sm text-gray-600 mb-1">Website AI-Powered ini dikembangkan oleh:</p>
                <p className="font-semibold text-ywm-dark">Mulky Malikul Dhaher</p>
                <p className="text-sm text-blue-600">Technical Engineer - PT. Yoga Wibawa Mandiri</p>
              </div>
              
              <Link 
                to="/tentang" 
                className="inline-flex items-center bg-ywm-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Selengkapnya
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
            <div className="animate-slide-in-right">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fasilitas Modern"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-ywm-dark mb-4">
              Layanan <span className="text-ywm-red">Unggulan</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Kami menyediakan layanan pengantongan dan distribusi semen berkualitas tinggi 
              dengan teknologi modern dan standar internasional.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-20 h-20 bg-ywm-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Factory className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark mb-4">Pengantongan Semen</h3>
              <p className="text-gray-600 leading-relaxed">
                Proses pengantongan otomatis dengan kapasitas besar dan kontrol kualitas ketat 
                untuk memastikan produk berkualitas tinggi.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-20 h-20 bg-ywm-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark mb-4">Distribusi Luas</h3>
              <p className="text-gray-600 leading-relaxed">
                Jaringan distribusi yang mencakup seluruh Aceh dan Sumatera Utara 
                dengan armada transport yang handal dan tepat waktu.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-ywm-dark mb-4">AI Customer Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Layanan pelanggan 24/7 dengan teknologi AI lokal yang memberikan respons 
                cepat dan akurat untuk semua pertanyaan Anda.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/layanan" 
              className="inline-flex items-center bg-ywm-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
            >
              Lihat Semua Layanan
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ywm-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siap Bermitra dengan Kami?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hubungi tim kami untuk konsultasi dan penawaran terbaik 
            sesuai kebutuhan proyek konstruksi Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/kontak" 
              className="bg-white text-ywm-red px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Hubungi Sekarang
            </Link>
            <Link 
              to="/lokasi" 
              className="border-2 border-white text-white hover:bg-white hover:text-ywm-red px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Lihat Lokasi
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;