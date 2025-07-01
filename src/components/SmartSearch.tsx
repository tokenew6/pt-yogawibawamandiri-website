import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'page' | 'service' | 'contact' | 'location';
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  keywords: string[];
}

interface SmartSearchProps {
  placeholder?: string;
  className?: string;
}

const SmartSearch: React.FC<SmartSearchProps> = ({ 
  placeholder = "Cari layanan, lokasi, atau informasi...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Mock data for search results
  const searchData: SearchResult[] = [
    {
      id: '1',
      type: 'service',
      title: 'Pengantongan Semen Otomatis',
      description: 'Layanan pengantongan semen dengan teknologi modern dan kapasitas besar',
      url: '/layanan',
      icon: <TrendingUp className="text-blue-500" size={20} />,
      keywords: ['pengantongan', 'semen', 'otomatis', 'teknologi', 'modern']
    },
    {
      id: '2',
      type: 'service',
      title: 'Distribusi & Logistik',
      description: 'Jaringan distribusi luas dengan armada transport handal',
      url: '/layanan',
      icon: <TrendingUp className="text-green-500" size={20} />,
      keywords: ['distribusi', 'logistik', 'transport', 'pengiriman']
    },
    {
      id: '3',
      type: 'location',
      title: 'Lokasi Pabrik',
      description: 'Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh',
      url: '/lokasi',
      icon: <MapPin className="text-red-500" size={20} />,
      keywords: ['lokasi', 'pabrik', 'krueng', 'geukueh', 'lhokseumawe', 'aceh']
    },
    {
      id: '4',
      type: 'contact',
      title: 'Hubungi Kami',
      description: 'Informasi kontak dan cara menghubungi tim kami',
      url: '/kontak',
      icon: <Phone className="text-purple-500" size={20} />,
      keywords: ['kontak', 'hubungi', 'telepon', 'email', 'whatsapp']
    },
    {
      id: '5',
      type: 'page',
      title: 'Tentang Perusahaan',
      description: 'Profil lengkap PT. Yoga Wibawa Mandiri',
      url: '/tentang',
      icon: <ExternalLink className="text-orange-500" size={20} />,
      keywords: ['tentang', 'profil', 'perusahaan', 'sejarah', 'visi', 'misi']
    },
    {
      id: '6',
      type: 'page',
      title: 'Galeri Foto',
      description: 'Koleksi foto fasilitas dan kegiatan perusahaan',
      url: '/galeri',
      icon: <ExternalLink className="text-pink-500" size={20} />,
      keywords: ['galeri', 'foto', 'fasilitas', 'kegiatan', 'dokumentasi']
    }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Search function with AI-like behavior
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = searchData.filter(item => {
        const searchTerm = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
        );
      });

      // Sort by relevance (simple scoring)
      const scored = filtered.map(item => {
        let score = 0;
        const searchTerm = searchQuery.toLowerCase();
        
        if (item.title.toLowerCase().includes(searchTerm)) score += 3;
        if (item.description.toLowerCase().includes(searchTerm)) score += 2;
        item.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(searchTerm)) score += 1;
        });
        
        return { ...item, score };
      });

      const sortedResults = scored.sort((a, b) => b.score - a.score);
      setResults(sortedResults);
      setLoading(false);
    }, 300);
  };

  // Handle search input change
  useEffect(() => {
    performSearch(query);
  }, [query]);

  // Handle search result click
  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    
    // Navigate to result
    navigate(result.url);
    setIsOpen(false);
    setQuery('');
  };

  // Handle recent search click
  const handleRecentClick = (searchTerm: string) => {
    setQuery(searchTerm);
    inputRef.current?.focus();
  };

  // Handle clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                   rounded-2xl focus:ring-2 focus:ring-ywm-red focus:border-transparent 
                   placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white
                   transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 
                     transition-colors duration-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search Results Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 
                     rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 
                     overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {loading ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ywm-red mx-auto mb-2"></div>
                Mencari...
              </div>
            ) : query ? (
              results.length > 0 ? (
                <div>
                  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {results.length} hasil ditemukan
                    </span>
                  </div>
                  {results.map((result) => (
                    <motion.button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                               transition-colors duration-200 text-left flex items-center space-x-3"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex-shrink-0">
                        {result.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {result.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {result.description}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  <Search size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Tidak ada hasil untuk "{query}"</p>
                  <p className="text-sm mt-2">Coba kata kunci lain atau hubungi kami untuk bantuan</p>
                </div>
              )
            ) : (
              <div>
                {recentSearches.length > 0 && (
                  <div>
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 
                                  flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Pencarian Terkini</span>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-ywm-red hover:text-red-700 transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleRecentClick(search)}
                        className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 
                                 transition-colors duration-200 text-left flex items-center space-x-3"
                        whileHover={{ x: 4 }}
                      >
                        <Clock className="text-gray-400" size={16} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{search}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  Ketik untuk mulai mencari...
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartSearch;
