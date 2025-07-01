import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const JSPuterAI = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const companyInfo = {
    id: {
      name: "PT. Yoga Wibawa Mandiri",
      services: [
        "Pengantongan Semen Padang dengan kapasitas 500 ton/hari",
        "Distribusi semen ke seluruh Aceh dan Sumatera Utara", 
        "Penyimpanan warehouse dengan kapasitas 10.000 ton",
        "Custom packaging sesuai kebutuhan klien"
      ],
      location: "Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh",
      coordinates: "5°14'36.4\"N 97°02'27.0\"E",
      experience: "15+ tahun pengalaman",
      certifications: ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001", "SNI"],
      contact: {
        phone: "+62 651 123456",
        email: "info@ywm.co.id",
        whatsapp: "+62 812 3456 7890"
      },
      workingHours: "Senin-Jumat: 08:00-17:00 WIB, Sabtu: 08:00-12:00 WIB"
    },
    en: {
      name: "PT. Yoga Wibawa Mandiri",
      services: [
        "Cement bagging with 500 tons/day capacity",
        "Cement distribution throughout Aceh and North Sumatra",
        "Warehouse storage with 10,000 tons capacity", 
        "Custom packaging according to client needs"
      ],
      location: "Krueng Geukueh Port, Lhokseumawe, Aceh",
      coordinates: "5°14'36.4\"N 97°02'27.0\"E",
      experience: "15+ years of experience",
      certifications: ["ISO 9001:2015", "ISO 14001:2015", "OHSAS 18001", "SNI"],
      contact: {
        phone: "+62 651 123456",
        email: "info@ywm.co.id",
        whatsapp: "+62 812 3456 7890"
      },
      workingHours: "Monday-Friday: 08:00-17:00 WIB, Saturday: 08:00-12:00 WIB"
    }
  };

  const faqs = {
    id: [
      {
        question: "Apa saja layanan yang tersedia?",
        answer: `Kami menyediakan layanan lengkap:\n\n${companyInfo.id.services.map(s => `• ${s}`).join('\n')}\n\nSemua dengan standar kualitas Semen Padang dan sertifikasi ISO.`
      },
      {
        question: "Dimana lokasi pabrik?",
        answer: `Pabrik kami berlokasi di ${companyInfo.id.location} dengan koordinat GPS ${companyInfo.id.coordinates}. Lokasi strategis ini memberikan akses mudah ke pelabuhan untuk distribusi yang efisien.`
      },
      {
        question: "Berapa kapasitas produksi?",
        answer: "Kapasitas pengantongan kami mencapai 500 ton per hari dengan sistem otomatis dan kontrol kualitas ketat. Kami juga memiliki warehouse dengan kapasitas penyimpanan 10.000 ton."
      },
      {
        question: "Bagaimana cara pesan?",
        answer: `Anda bisa memesan melalui:\n• Website: Gunakan sistem pemesanan online kami\n• WhatsApp: ${companyInfo.id.contact.whatsapp}\n• Telepon: ${companyInfo.id.contact.phone}\n• Email: ${companyInfo.id.contact.email}\n\nTim kami akan memproses pesanan Anda dengan cepat.`
      },
      {
        question: "Apa saja metode pembayaran?",
        answer: "Kami menerima berbagai metode pembayaran:\n• Bank Transfer (BCA, Mandiri, dll)\n• QRIS untuk pembayaran digital\n• E-wallet (GoPay, OVO, Dana, ShopeePay)\n• Kredit untuk klien korporat (30-90 hari)"
      }
    ],
    en: [
      {
        question: "What services are available?",
        answer: `We provide comprehensive services:\n\n${companyInfo.en.services.map(s => `• ${s}`).join('\n')}\n\nAll with Semen Padang quality standards and ISO certifications.`
      },
      {
        question: "Where is the factory located?",
        answer: `Our factory is located at ${companyInfo.en.location} with GPS coordinates ${companyInfo.en.coordinates}. This strategic location provides easy access to ports for efficient distribution.`
      },
      {
        question: "What is the production capacity?",
        answer: "Our bagging capacity reaches 500 tons per day with automated systems and strict quality control. We also have a warehouse with 10,000 tons storage capacity."
      },
      {
        question: "How to place an order?",
        answer: `You can order through:\n• Website: Use our online ordering system\n• WhatsApp: ${companyInfo.en.contact.whatsapp}\n• Phone: ${companyInfo.en.contact.phone}\n• Email: ${companyInfo.en.contact.email}\n\nOur team will process your order quickly.`
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept various payment methods:\n• Bank Transfer (BCA, Mandiri, etc)\n• QRIS for digital payments\n• E-wallet (GoPay, OVO, Dana, ShopeePay)\n• Credit for corporate clients (30-90 days)"
      }
    ]
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = i18n.language === 'en' 
        ? "Hello! I'm the AI Assistant for PT. Yoga Wibawa Mandiri. How can I help you today? I can provide information about our cement bagging services, location, pricing, and more."
        : "Halo! Saya Asisten AI PT. Yoga Wibawa Mandiri. Ada yang bisa saya bantu? Saya bisa memberikan informasi tentang layanan pengantongan semen, lokasi, harga, dan lainnya.";
      
      setMessages([{
        id: '1',
        text: greeting,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, i18n.language]);

  const findBestAnswer = (userInput: string): string => {
    const input = userInput.toLowerCase();
    const currentFaqs = i18n.language === 'en' ? faqs.en : faqs.id;
    const currentInfo = i18n.language === 'en' ? companyInfo.en : companyInfo.id;
    
    // Keywords untuk topik berbeda
    if (input.includes('layanan') || input.includes('service') || input.includes('jasa')) {
      return currentFaqs.find(f => f.question.toLowerCase().includes('layanan') || f.question.toLowerCase().includes('service'))?.answer || '';
    }
    
    if (input.includes('lokasi') || input.includes('location') || input.includes('alamat') || input.includes('address')) {
      return currentFaqs.find(f => f.question.toLowerCase().includes('lokasi') || f.question.toLowerCase().includes('location'))?.answer || '';
    }
    
    if (input.includes('kapasitas') || input.includes('capacity') || input.includes('produksi') || input.includes('production')) {
      return currentFaqs.find(f => f.question.toLowerCase().includes('kapasitas') || f.question.toLowerCase().includes('capacity'))?.answer || '';
    }
    
    if (input.includes('pesan') || input.includes('order') || input.includes('beli') || input.includes('buy')) {
      return currentFaqs.find(f => f.question.toLowerCase().includes('pesan') || f.question.toLowerCase().includes('order'))?.answer || '';
    }
    
    if (input.includes('bayar') || input.includes('payment') || input.includes('harga') || input.includes('price')) {
      return currentFaqs.find(f => f.question.toLowerCase().includes('bayar') || f.question.toLowerCase().includes('payment'))?.answer || '';
    }
    
    if (input.includes('kontak') || input.includes('contact') || input.includes('telepon') || input.includes('phone')) {
      return i18n.language === 'en' 
        ? `You can contact us through:\n• Phone: ${currentInfo.contact.phone}\n• Email: ${currentInfo.contact.email}\n• WhatsApp: ${currentInfo.contact.whatsapp}\n\nWorking hours: ${currentInfo.workingHours}`
        : `Anda bisa menghubungi kami melalui:\n• Telepon: ${currentInfo.contact.phone}\n• Email: ${currentInfo.contact.email}\n• WhatsApp: ${currentInfo.contact.whatsapp}\n\nJam kerja: ${currentInfo.workingHours}`;
    }
    
    if (input.includes('sertifikat') || input.includes('certificate') || input.includes('iso')) {
      return i18n.language === 'en'
        ? `We have the following certifications:\n${currentInfo.certifications.map(c => `• ${c}`).join('\n')}\n\nThese certifications ensure our quality standards and environmental compliance.`
        : `Kami memiliki sertifikasi berikut:\n${currentInfo.certifications.map(c => `• ${c}`).join('\n')}\n\nSertifikasi ini memastikan standar kualitas dan kepatuhan lingkungan kami.`;
    }
    
    // Default response
    return i18n.language === 'en'
      ? "I'd be happy to help! You can ask me about:\n• Our services and capacity\n• Factory location and coordinates\n• How to place orders\n• Payment methods\n• Contact information\n• Certifications\n\nWhat would you like to know?"
      : "Saya dengan senang hati membantu! Anda bisa bertanya tentang:\n• Layanan dan kapasitas kami\n• Lokasi pabrik dan koordinat\n• Cara memesan\n• Metode pembayaran\n• Informasi kontak\n• Sertifikasi\n\nApa yang ingin Anda ketahui?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = findBestAnswer(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* AI Chat Bubble */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl animate-bounce-slow"
          >
            <Bot size={24} className="text-white" />
          </Button>
          <div className="absolute -top-12 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap">
            {i18n.language === 'en' ? '👋 Need help? Ask me!' : '👋 Butuh bantuan? Tanya saya!'}
          </div>
        </div>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50">
          <Card className="h-full shadow-2xl border-0 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-sm">
                      {i18n.language === 'en' ? 'AI Assistant' : 'Asisten AI'}
                    </CardTitle>
                    <p className="text-xs text-blue-100 flex items-center">
                      <Zap size={12} className="mr-1" />
                      {i18n.language === 'en' ? 'JS Puter AI - Local Processing' : 'JS Puter AI - Pemrosesan Lokal'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X size={16} />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-blue-600 text-white ml-4'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white mr-4'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 dark:border-gray-600 p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={i18n.language === 'en' ? 'Type your message...' : 'Ketik pesan Anda...'}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default JSPuterAI;
