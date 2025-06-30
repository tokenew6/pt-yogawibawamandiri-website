import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isVoice?: boolean;
}

const VoiceAIAssistant = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Company knowledge base
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

  useEffect(() => {
    // Check for speech recognition and synthesis support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const speechSynthesis = window.speechSynthesis;
    
    if (SpeechRecognition && speechSynthesis) {
      setVoiceSupported(true);
      synthRef.current = speechSynthesis;
      
      // Initialize speech recognition
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = i18n.language === 'en' ? 'en-US' : 'id-ID';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize conversation
    if (isOpen && messages.length === 0) {
      const greeting = i18n.language === 'en' 
        ? "Hello! I'm the voice-enabled AI Assistant for PT. Yoga Wibawa Mandiri. You can type or speak to me. How can I help you today?"
        : "Halo! Saya Asisten AI bersuara untuk PT. Yoga Wibawa Mandiri. Anda bisa mengetik atau berbicara dengan saya. Ada yang bisa saya bantu?";
      
      const welcomeMessage = {
        id: '1',
        text: greeting,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      // Speak the greeting if speech is enabled
      if (speechEnabled && voiceSupported) {
        speakText(greeting);
      }
    }
  }, [isOpen, i18n.language, speechEnabled, voiceSupported]);

  const speakText = (text: string) => {
    if (!synthRef.current || !speechEnabled) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = i18n.language === 'en' ? 'en-US' : 'id-ID';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;
    
    // Try to find a good voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith(i18n.language === 'en' ? 'en' : 'id') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    ) || voices.find(voice => 
      voice.lang.startsWith(i18n.language === 'en' ? 'en' : 'id')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (!recognitionRef.current || isListening) return;
    
    setIsListening(true);
    recognitionRef.current.lang = i18n.language === 'en' ? 'en-US' : 'id-ID';
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const findBestAnswer = (userInput: string): string => {
    const input = userInput.toLowerCase();
    const currentInfo = i18n.language === 'en' ? companyInfo.en : companyInfo.id;
    
    // Enhanced responses with more conversational tone
    if (input.includes('hello') || input.includes('hi') || input.includes('halo') || input.includes('hai')) {
      return i18n.language === 'en'
        ? "Hello! Welcome to PT. Yoga Wibawa Mandiri. I'm your AI assistant and I can speak with you. How can I help you today?"
        : "Halo! Selamat datang di PT. Yoga Wibawa Mandiri. Saya asisten AI Anda dan saya bisa berbicara dengan Anda. Ada yang bisa saya bantu hari ini?";
    }
    
    if (input.includes('voice') || input.includes('speak') || input.includes('suara') || input.includes('bicara')) {
      return i18n.language === 'en'
        ? "Yes, I can speak! You can also talk to me using the microphone button. I support both English and Indonesian languages."
        : "Ya, saya bisa berbicara! Anda juga bisa berbicara dengan saya menggunakan tombol mikrofon. Saya mendukung bahasa Inggris dan Indonesia.";
    }
    
    if (input.includes('layanan') || input.includes('service') || input.includes('jasa')) {
      const response = i18n.language === 'en' 
        ? `We provide comprehensive cement services:\n\n${currentInfo.services.map(s => `• ${s}`).join('\n')}\n\nAll with Semen Padang quality standards and ISO certifications.`
        : `Kami menyediakan layanan semen yang lengkap:\n\n${currentInfo.services.map(s => `• ${s}`).join('\n')}\n\nSemua dengan standar kualitas Semen Padang dan sertifikasi ISO.`;
      return response;
    }
    
    if (input.includes('lokasi') || input.includes('location') || input.includes('alamat') || input.includes('address')) {
      return i18n.language === 'en'
        ? `Our factory is strategically located at ${currentInfo.location} with GPS coordinates ${currentInfo.coordinates}. This location provides easy access to ports for efficient distribution throughout Aceh and North Sumatra.`
        : `Pabrik kami berlokasi strategis di ${currentInfo.location} dengan koordinat GPS ${currentInfo.coordinates}. Lokasi ini memberikan akses mudah ke pelabuhan untuk distribusi yang efisien ke seluruh Aceh dan Sumatera Utara.`;
    }
    
    if (input.includes('kontak') || input.includes('contact') || input.includes('telepon') || input.includes('phone')) {
      return i18n.language === 'en' 
        ? `You can reach us through:\n• Phone: ${currentInfo.contact.phone}\n• Email: ${currentInfo.contact.email}\n• WhatsApp: ${currentInfo.contact.whatsapp}\n\nOur working hours: ${currentInfo.workingHours}`
        : `Anda bisa menghubungi kami melalui:\n• Telepon: ${currentInfo.contact.phone}\n• Email: ${currentInfo.contact.email}\n• WhatsApp: ${currentInfo.contact.whatsapp}\n\nJam kerja kami: ${currentInfo.workingHours}`;
    }
    
    // Default response
    return i18n.language === 'en'
      ? "I'm here to help! You can ask me about our services, location, contact information, or anything else about PT. Yoga Wibawa Mandiri. Feel free to speak or type your questions."
      : "Saya di sini untuk membantu! Anda bisa bertanya tentang layanan kami, lokasi, informasi kontak, atau hal lain tentang PT. Yoga Wibawa Mandiri. Silakan berbicara atau ketik pertanyaan Anda.";
  };

  const handleSendMessage = async (isVoiceMessage = false) => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      isVoice: isVoiceMessage
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
      
      // Speak the response if speech is enabled
      if (speechEnabled && voiceSupported) {
        speakText(aiResponse);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if (inputText.trim()) {
      handleSendMessage(true);
    }
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (synthRef.current && speechEnabled) {
      synthRef.current.cancel();
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
            {i18n.language === 'en' ? '🎤 Voice AI - Ask me anything!' : '🎤 AI Suara - Tanya apa saja!'}
          </div>
        </div>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] z-50">
          <Card className="h-full shadow-2xl border-0 bg-white dark:bg-gray-800">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-sm">
                      {i18n.language === 'en' ? 'Voice AI Assistant' : 'Asisten AI Suara'}
                    </CardTitle>
                    <p className="text-xs text-blue-100 flex items-center">
                      🎤 {i18n.language === 'en' ? 'Speak or Type' : 'Bicara atau Ketik'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {voiceSupported && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleSpeech}
                      className="text-white hover:bg-white/20 p-1"
                    >
                      {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X size={16} />
                  </Button>
                </div>
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
                      <div className="flex items-center space-x-2">
                        {message.isVoice && <Mic size={12} className="opacity-70" />}
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                      </div>
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
                    placeholder={i18n.language === 'en' ? 'Type or speak your message...' : 'Ketik atau ucapkan pesan Anda...'}
                    className="flex-1"
                  />
                  {voiceSupported && (
                    <Button 
                      onClick={isListening ? stopListening : startListening}
                      disabled={isTyping}
                      className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                      size="sm"
                    >
                      {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                    </Button>
                  )}
                  <Button 
                    onClick={() => inputText.includes(' ') ? handleVoiceInput() : handleSendMessage()}
                    disabled={!inputText.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    <Send size={16} />
                  </Button>
                </div>
                {isListening && (
                  <p className="text-xs text-center mt-2 text-blue-600 dark:text-blue-400">
                    {i18n.language === 'en' ? 'Listening... Speak now' : 'Mendengarkan... Silakan bicara'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default VoiceAIAssistant;
