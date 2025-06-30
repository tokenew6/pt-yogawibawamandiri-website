import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false
}: SEOHeadProps) => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  const baseUrl = window.location.origin;
  const currentUrl = url || `${baseUrl}${location.pathname}`;
  
  const defaultTitle = i18n.language === 'en' 
    ? 'PT. Yoga Wibawa Mandiri - Trusted Cement Bagging Partner in Lhokseumawe'
    : 'PT. Yoga Wibawa Mandiri - Pengantongan Semen Padang Terpercaya di Lhokseumawe';
    
  const defaultDescription = i18n.language === 'en'
    ? 'Leading cement bagging company in Lhokseumawe, Aceh. Official partner of Semen Padang with modern facilities and wide distribution network across Aceh and North Sumatra.'
    : 'Perusahaan pengantongan semen terkemuka di Lhokseumawe, Aceh. Mitra resmi Semen Padang dengan fasilitas modern dan jaringan distribusi luas di Aceh dan Sumatera Utara.';
    
  const defaultKeywords = i18n.language === 'en'
    ? 'cement bagging, Lhokseumawe, Aceh, Semen Padang, distribution, construction materials, cement supplier, bagging services, North Sumatra'
    : 'pengantongan semen, Lhokseumawe, Aceh, Semen Padang, distribusi, bahan konstruksi, supplier semen, layanan pengantongan, Sumatera Utara';
    
  const defaultImage = `${baseUrl}/ywm-logo-transparent.svg`;

  const finalTitle = title ? `${title} | PT. Yoga Wibawa Mandiri` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', 'PT. Yoga Wibawa Mandiri');
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('language', i18n.language === 'en' ? 'English' : 'Indonesian');
    updateMetaTag('geo.region', 'ID-AC');
    updateMetaTag('geo.placename', 'Lhokseumawe, Aceh');
    updateMetaTag('geo.position', '5.243444;97.040833');
    updateMetaTag('ICBM', '5.243444, 97.040833');

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true);
    updateMetaTag('og:description', finalDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', finalImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'PT. Yoga Wibawa Mandiri', true);
    updateMetaTag('og:locale', i18n.language === 'en' ? 'en_US' : 'id_ID', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    updateMetaTag('twitter:url', currentUrl);

    // Additional business-specific meta tags
    updateMetaTag('business:contact_data:street_address', 'Pelabuhan Krueng Geukueh');
    updateMetaTag('business:contact_data:locality', 'Lhokseumawe');
    updateMetaTag('business:contact_data:region', 'Aceh');
    updateMetaTag('business:contact_data:postal_code', '24352');
    updateMetaTag('business:contact_data:country_name', 'Indonesia');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    // Alternate language links
    let alternateLinkId = document.querySelector('link[hreflang="id"]') as HTMLLinkElement;
    let alternateLinkEn = document.querySelector('link[hreflang="en"]') as HTMLLinkElement;
    
    if (!alternateLinkId) {
      alternateLinkId = document.createElement('link');
      alternateLinkId.rel = 'alternate';
      alternateLinkId.hreflang = 'id';
      document.head.appendChild(alternateLinkId);
    }
    alternateLinkId.href = currentUrl;

    if (!alternateLinkEn) {
      alternateLinkEn = document.createElement('link');
      alternateLinkEn.rel = 'alternate';
      alternateLinkEn.hreflang = 'en';
      document.head.appendChild(alternateLinkEn);
    }
    alternateLinkEn.href = currentUrl;

    // Schema.org structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "PT. Yoga Wibawa Mandiri",
      "alternateName": "PT. YWM",
      "description": finalDescription,
      "url": baseUrl,
      "logo": finalImage,
      "image": finalImage,
      "telephone": "+62-651-123456",
      "email": "info@ywm.co.id",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Pelabuhan Krueng Geukueh",
        "addressLocality": "Lhokseumawe",
        "addressRegion": "Aceh",
        "postalCode": "24352",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 5.243444,
        "longitude": 97.040833
      },
      "foundingDate": "2010",
      "numberOfEmployees": "50-100",
      "industry": "Cement Manufacturing",
      "keywords": finalKeywords,
      "serviceArea": [
        {
          "@type": "State",
          "name": "Aceh"
        },
        {
          "@type": "State", 
          "name": "Sumatera Utara"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cement Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pengantongan Semen",
              "description": "Layanan pengantongan semen curah dengan kapasitas besar"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Distribusi Semen",
              "description": "Distribusi semen ke seluruh Aceh dan Sumatera Utara"
            }
          }
        ]
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-651-123456",
        "contactType": "customer service",
        "areaServed": ["ID-AC", "ID-SU"],
        "availableLanguage": ["Indonesian", "English"]
      },
      "sameAs": [
        "https://www.facebook.com/ptywm",
        "https://www.instagram.com/ptywm",
        "https://www.linkedin.com/company/ptywm"
      ]
    };

    // Remove existing structured data
    const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
    if (existingStructuredData) {
      existingStructuredData.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [finalTitle, finalDescription, finalKeywords, finalImage, currentUrl, type, noindex, i18n.language]);

  return null;
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    id: {
      title: 'Beranda',
      description: 'PT. Yoga Wibawa Mandiri - Pengantongan Semen Padang terpercaya di Lhokseumawe dengan teknologi modern dan kualitas terjamin.',
      keywords: 'pengantongan semen, Lhokseumawe, Aceh, Semen Padang, distribusi semen, supplier semen'
    },
    en: {
      title: 'Home',
      description: 'PT. Yoga Wibawa Mandiri - Trusted cement bagging in Lhokseumawe with modern technology and guaranteed quality.',
      keywords: 'cement bagging, Lhokseumawe, Aceh, Semen Padang, cement distribution, cement supplier'
    }
  },
  services: {
    id: {
      title: 'Layanan Pengantongan & Distribusi Semen',
      description: 'Layanan lengkap pengantongan semen curah, distribusi, pergudangan, dan konsultasi teknis dengan teknologi modern.',
      keywords: 'layanan pengantongan, distribusi semen, pergudangan semen, konsultasi teknis, quality control'
    },
    en: {
      title: 'Cement Bagging & Distribution Services',
      description: 'Complete cement bagging, distribution, warehousing, and technical consulting services with modern technology.',
      keywords: 'bagging services, cement distribution, cement warehousing, technical consulting, quality control'
    }
  },
  about: {
    id: {
      title: 'Tentang Kami - Mitra Resmi Semen Padang',
      description: 'Sejarah, visi misi, dan komitmen PT. Yoga Wibawa Mandiri sebagai mitra resmi Semen Padang di Aceh dan Sumatera Utara.',
      keywords: 'tentang PT YWM, sejarah perusahaan, mitra Semen Padang, visi misi, pengalaman 15 tahun'
    },
    en: {
      title: 'About Us - Official Semen Padang Partner',
      description: 'History, vision mission, and commitment of PT. Yoga Wibawa Mandiri as official Semen Padang partner in Aceh and North Sumatra.',
      keywords: 'about PT YWM, company history, Semen Padang partner, vision mission, 15 years experience'
    }
  },
  location: {
    id: {
      title: 'Lokasi Pabrik & Area Distribusi',
      description: 'Lokasi strategis pabrik pengantongan di Pelabuhan Krueng Geukueh dan area distribusi ke seluruh Aceh & Sumut.',
      keywords: 'lokasi pabrik, Pelabuhan Krueng Geukueh, area distribusi, Aceh, Sumatera Utara, alamat kantor'
    },
    en: {
      title: 'Factory Location & Distribution Area',
      description: 'Strategic factory location at Krueng Geukueh Port and distribution area throughout Aceh & North Sumatra.',
      keywords: 'factory location, Krueng Geukueh Port, distribution area, Aceh, North Sumatra, office address'
    }
  },
  contact: {
    id: {
      title: 'Kontak & Customer Service',
      description: 'Hubungi tim customer service PT. Yoga Wibawa Mandiri untuk konsultasi, pemesanan, dan informasi layanan.',
      keywords: 'kontak PT YWM, customer service, konsultasi, pemesanan semen, WhatsApp, telepon'
    },
    en: {
      title: 'Contact & Customer Service',
      description: 'Contact PT. Yoga Wibawa Mandiri customer service team for consultation, ordering, and service information.',
      keywords: 'contact PT YWM, customer service, consultation, cement ordering, WhatsApp, phone'
    }
  },
  order: {
    id: {
      title: 'Sistem Pemesanan Online Semen',
      description: 'Pesan semen secara online dengan sistem pembayaran lengkap: Bank Transfer, QRIS, E-wallet, dan Kredit.',
      keywords: 'pesan semen online, sistem pemesanan, pembayaran digital, QRIS, e-wallet, bank transfer'
    },
    en: {
      title: 'Online Cement Ordering System',
      description: 'Order cement online with complete payment system: Bank Transfer, QRIS, E-wallet, and Credit.',
      keywords: 'order cement online, ordering system, digital payment, QRIS, e-wallet, bank transfer'
    }
  }
};

export default SEOHead;
