import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Truck, Award, Users, Bot, Zap, Star, Shield, Clock, Globe, Phone, Mail, MapPin, Play, Download, ShoppingCart, TrendingUp, CheckCircle, Sparkles, Rocket, Target, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEOHead, { pageSEO } from '@/components/SEOHead';
import { trackEvent } from '@/components/GoogleAnalytics';
import { 
  FadeInWhenVisible, 
  StaggerContainer, 
  StaggerChild, 
  HoverScale, 
  MagneticHover,
  FloatingElement,
  AnimatedCounter,
  TypewriterText,
  AnimatedGradientText,
  ParallaxScroll
} from '@/components/ModernAnimations';
import { SmartLoader } from '@/components/ModernLoadingStates';

const ModernIndex = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    experience: 0,
    tons: 0,
    clients: 0,
    coverage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);

  // Enhanced hero slides
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Pengantongan Semen Berkualitas Tinggi",
      subtitle: "Teknologi Modern, Kualitas Terpercaya",
      accent: "from-blue-600 to-purple-600"
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Distribusi Terluas di Aceh & Sumut",
      subtitle: "Jangkauan Nasional, Pelayanan Prima",
      accent: "from-green-600 to-teal-600"
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Mitra Resmi Semen Padang",
      subtitle: "Kepercayaan dan Kualitas Sejak 2008",
      accent: "from-red-600 to-pink-600"
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Slide animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (!isLoading) {
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
    }
  }, [isLoading]);

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
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  };

  if (isLoading) {
    return <SmartLoader type="page" title="Memuat Halaman Utama" />;
  }
  
  return (
    <Layout>
      <SEOHead 
        title={pageSEO.home[t.language as 'id' | 'en']?.title}
        description={pageSEO.home[t.language as 'id' | 'en']?.description}
        keywords={pageSEO.home[t.language as 'id' | 'en']?.keywords}
      />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              style={{ y: index === currentSlide ? y1 : 0 }}
            >
              <img 
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-ywm-red/40 to-black/80"></div>
            </motion.div>
          ))}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <FloatingElement key={i} duration={4 + Math.random() * 2} amplitude={15 + Math.random() * 10}>
              <div
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              ></div>
            </FloatingElement>
          ))}
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          {/* Enhanced Badge */}
          <FadeInWhenVisible delay={0.2}>
            <motion.div 
              className={`inline-flex items-center space-x-3 bg-gradient-to-r ${heroSlides[currentSlide].accent} 
                        backdrop-blur-sm px-6 py-3 rounded-full mb-6`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Sparkles size={20} className="text-yellow-300" />
              <TypewriterText text="AI-Powered Smart Factory | Industry 4.0" speed={80} />
              <Bot size={20} className="text-cyan-300" />
            </motion.div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4}>
            <AnimatedGradientText className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              {heroSlides[currentSlide].title}
            </AnimatedGradientText>
          </FadeInWhenVisible>
          
          <FadeInWhenVisible delay={0.6}>
            <p className="text-xl md:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              {heroSlides[currentSlide].subtitle}
            </p>
          </FadeInWhenVisible>

          {/* Action Buttons */}
          <FadeInWhenVisible delay={0.8}>
            <StaggerContainer>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <StaggerChild>
                  <MagneticHover>
                    <motion.button
                      onClick={handlePhoneCall}
                      className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
                               text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                               flex items-center space-x-3 shadow-2xl hover:shadow-green-500/30"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Phone size={24} className="group-hover:animate-bounce" />
                      <span>Hubungi Sekarang</span>
                      <motion.div 
                        className="w-2 h-2 bg-green-300 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.button>
                  </MagneticHover>
                </StaggerChild>

                <StaggerChild>
                  <MagneticHover>
                    <motion.button
                      onClick={handleWhatsApp}
                      className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 
                               text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                               flex items-center space-x-3 shadow-2xl hover:shadow-emerald-500/30"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Globe size={24} className="group-hover:animate-bounce" />
                      <span>WhatsApp</span>
                    </motion.button>
                  </MagneticHover>
                </StaggerChild>

                <StaggerChild>
                  <MagneticHover>
                    <Link 
                      to="/order" 
                      className="group bg-gradient-to-r from-ywm-red to-red-600 hover:from-red-600 hover:to-red-700 
                               text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 
                               flex items-center space-x-3 shadow-2xl hover:shadow-red-500/30"
                      onClick={() => handleCTAClick('order_now')}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ShoppingCart size={24} className="group-hover:animate-bounce" />
                      </motion.div>
                      <span>Pesan Sekarang</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight size={20} />
                      </motion.div>
                    </Link>
                  </MagneticHover>
                </StaggerChild>
              </div>
            </StaggerContainer>
          </FadeInWhenVisible>

          {/* Quick Access Buttons */}
          <FadeInWhenVisible delay={1.0}>
            <StaggerContainer staggerDelay={0.05}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <StaggerChild>
                  <HoverScale>
                    <button
                      onClick={handleVideoPlay}
                      className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 
                               rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 
                               border border-white/20 hover:border-white/40"
                    >
                      <Play size={18} />
                      <span>Tonton Video</span>
                    </button>
                  </HoverScale>
                </StaggerChild>

                <StaggerChild>
                  <HoverScale>
                    <Link
                      to="/lokasi"
                      className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 
                               rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 
                               border border-white/20 hover:border-white/40"
                    >
                      <MapPin size={18} />
                      <span>Lihat Lokasi</span>
                    </Link>
                  </HoverScale>
                </StaggerChild>
              </div>
            </StaggerContainer>
          </FadeInWhenVisible>

          {/* Slide Indicators */}
          <FadeInWhenVisible delay={1.2}>
            <div className="flex justify-center space-x-3">
              {heroSlides.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <ParallaxScroll offset={30}>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </ParallaxScroll>

        <div className="container mx-auto px-4 relative">
          <FadeInWhenVisible>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-ywm-dark dark:text-white mb-4"
                whileInView={{ scale: [0.9, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Pencapaian <AnimatedGradientText className="inline">Terbaik</AnimatedGradientText>
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Dedikasi dan komitmen kami dalam memberikan pelayanan terbaik
              </p>
            </div>
          </FadeInWhenVisible>

          <StaggerContainer>
            <div className="grid md:grid-cols-4 gap-8">
              {/* Experience */}
              <StaggerChild>
                <MagneticHover>
                  <motion.div 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                              transform transition-all duration-300 border border-gray-100 dark:border-gray-700
                              hover:border-ywm-red/20"
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative mb-6">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-ywm-red to-red-600 rounded-2xl 
                                  flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-red-500/30"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Clock className="text-white" size={36} />
                      </motion.div>
                      <FloatingElement duration={3} amplitude={5}>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full 
                                      flex items-center justify-center">
                          <Star size={14} className="text-white" />
                        </div>
                      </FloatingElement>
                    </div>
                    <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                      <AnimatedCounter value={animatedNumbers.experience} suffix="+" />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Tahun Pengalaman</p>
                  </motion.div>
                </MagneticHover>
              </StaggerChild>

              {/* Production Capacity */}
              <StaggerChild>
                <MagneticHover>
                  <motion.div 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                              transform transition-all duration-300 border border-gray-100 dark:border-gray-700
                              hover:border-blue-500/20"
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative mb-6">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl 
                                  flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-blue-500/30"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Factory className="text-white" size={36} />
                      </motion.div>
                      <FloatingElement duration={3} amplitude={5}>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full 
                                      flex items-center justify-center">
                          <TrendingUp size={14} className="text-white" />
                        </div>
                      </FloatingElement>
                    </div>
                    <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                      <AnimatedCounter value={animatedNumbers.tons} suffix="K+" />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Ton per Tahun</p>
                  </motion.div>
                </MagneticHover>
              </StaggerChild>

              {/* Clients */}
              <StaggerChild>
                <MagneticHover>
                  <motion.div 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                              transform transition-all duration-300 border border-gray-100 dark:border-gray-700
                              hover:border-purple-500/20"
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative mb-6">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl 
                                  flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-purple-500/30"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Users className="text-white" size={36} />
                      </motion.div>
                      <FloatingElement duration={3} amplitude={5}>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full 
                                      flex items-center justify-center">
                          <Crown size={14} className="text-white" />
                        </div>
                      </FloatingElement>
                    </div>
                    <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                      <AnimatedCounter value={animatedNumbers.clients} suffix="+" />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Klien Aktif</p>
                  </motion.div>
                </MagneticHover>
              </StaggerChild>

              {/* Coverage */}
              <StaggerChild>
                <MagneticHover>
                  <motion.div 
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                              transform transition-all duration-300 border border-gray-100 dark:border-gray-700
                              hover:border-green-500/20"
                    whileHover={{ y: -10 }}
                  >
                    <div className="relative mb-6">
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl 
                                  flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-green-500/30"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Target className="text-white" size={36} />
                      </motion.div>
                      <FloatingElement duration={3} amplitude={5}>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full 
                                      flex items-center justify-center">
                          <Rocket size={14} className="text-white" />
                        </div>
                      </FloatingElement>
                    </div>
                    <h3 className="text-4xl font-bold text-ywm-dark dark:text-white mb-2 font-mono">
                      <AnimatedCounter value={animatedNumbers.coverage} suffix="+" />
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-medium">Kota Terjangkau</p>
                  </motion.div>
                </MagneticHover>
              </StaggerChild>
            </div>
          </StaggerContainer>
        </div>
      </section>
      
    </Layout>
  );
};

export default ModernIndex;
