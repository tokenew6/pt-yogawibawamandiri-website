import { useEffect, useState } from 'react'
import { Bot, X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
}

declare global {
  interface Window {
    JSPuterBot?: any
  }
}

const JSPuterAI = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya Asisten AI PT. Yoga Wibawa Mandiri. Ada yang bisa saya bantu?',
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [aiInitialized, setAiInitialized] = useState(false)

  useEffect(() => {
    // Load JS Puter SDK
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/jsputer@latest/dist/jsputer.min.js'
    script.onload = () => {
      initializeJSPuter()
    }
    script.onerror = () => {
      console.warn('JS Puter SDK failed to load, using fallback AI responses')
      setAiInitialized(false)
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const initializeJSPuter = () => {
    try {
      if (window.JSPuterBot) {
        // Initialize with company-specific context
        setAiInitialized(true)
        console.log('JS Puter AI initialized successfully')
      }
    } catch (error) {
      console.warn('JS Puter initialization failed:', error)
      setAiInitialized(false)
    }
  }

  const getAIResponse = async (message: string): Promise<string> => {
    if (aiInitialized && window.JSPuterBot) {
      try {
        // Use JS Puter API for AI responses
        const response = await window.JSPuterBot.query({
          message: message,
          context: `Anda adalah asisten AI untuk PT. Yoga Wibawa Mandiri, perusahaan pengantongan semen di Lhokseumawe, Aceh. 
          
          Informasi Perusahaan:
          - Nama: PT. Yoga Wibawa Mandiri  
          - Lokasi: Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh
          - Bisnis: Pengantongan semen, mitra resmi Semen Padang
          - Kapasitas: 500K+ ton semen per tahun
          - Pengalaman: 15+ tahun
          - Sertifikat: ISO
          
          Layanan:
          1. Pengantongan Semen Bulk - Proses otomatis dengan kontrol kualitas ketat
          2. Distribusi & Logistik - Jaringan ke seluruh Aceh dan Sumatera Utara  
          3. Warehouse & Handling - Fasilitas penyimpanan modern
          
          Jawab dalam bahasa Indonesia dengan ramah dan profesional. Fokus pada informasi perusahaan dan layanan.`,
          temperature: 0.7
        })
        
        return response.text || 'Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.'
      } catch (error) {
        console.error('JS Puter API error:', error)
        return getFallbackResponse(message)
      }
    } else {
      return getFallbackResponse(message)
    }
  }

  const getFallbackResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    if (lowerMessage.includes('layanan') || lowerMessage.includes('service')) {
      return `PT. Yoga Wibawa Mandiri menyediakan 3 layanan utama:

1. **Pengantongan Semen** - Proses otomatis dengan kontrol kualitas ketat
2. **Distribusi & Logistik** - Jaringan ke seluruh Aceh dan Sumatera Utara  
3. **Warehouse & Handling** - Fasilitas penyimpanan modern

Kami adalah mitra resmi Semen Padang dengan kapasitas 500K+ ton per tahun.`
    }
    
    if (lowerMessage.includes('lokasi') || lowerMessage.includes('alamat') || lowerMessage.includes('location')) {
      return `PT. Yoga Wibawa Mandiri berlokasi di:

📍 **Alamat:** Pelabuhan Krueng Geukueh, Lhokseumawe, Aceh
🏭 **Fasilitas:** Pabrik pengantongan modern dengan akses pelabuhan
🚛 **Distribusi:** Mencakup seluruh Aceh dan Sumatera Utara

Lokasi strategis di pelabuhan memungkinkan distribusi yang efisien ke seluruh wilayah.`
    }
    
    if (lowerMessage.includes('kontak') || lowerMessage.includes('hubungi') || lowerMessage.includes('contact')) {
      return `Untuk menghubungi PT. Yoga Wibawa Mandiri:

📧 **Email:** info@yogawibawamandiri.com
📱 **WhatsApp:** [Klik tombol WhatsApp di website]
🏢 **Kantor:** Pelabuhan Krueng Geukueh, Lhokseumawe

Tim customer service kami siap membantu Anda 24/7!`
    }
    
    if (lowerMessage.includes('harga') || lowerMessage.includes('price') || lowerMessage.includes('tarif')) {
      return `Untuk informasi harga dan penawaran khusus:

💰 Harga bervariasi sesuai volume dan lokasi pengiriman
📊 Tersedia paket khusus untuk proyek besar
🎯 Discount menarik untuk pelanggan reguler

Silakan hubungi tim sales kami untuk mendapatkan penawaran terbaik sesuai kebutuhan proyek Anda.`
    }
    
    if (lowerMessage.includes('semen padang') || lowerMessage.includes('semen')) {
      return `PT. Yoga Wibawa Mandiri adalah **Mitra Resmi Semen Padang** di wilayah Aceh.

🏆 **Keunggulan:**
- Kualitas semen terjamin sesuai standar SNI
- Sertifikat ISO untuk kontrol kualitas
- Proses pengantongan otomatis dan higienis
- Distribusi tepat waktu ke seluruh wilayah

Kami menjamin keaslian dan kualitas produk Semen Padang untuk semua kebutuhan konstruksi Anda.`
    }
    
    if (lowerMessage.includes('perusahaan') || lowerMessage.includes('tentang') || lowerMessage.includes('company')) {
      return `**PT. Yoga Wibawa Mandiri** 

🏭 **Didirikan:** Sebagai mitra strategis Semen Padang
📍 **Lokasi:** Pelabuhan Krueng Geukueh, Lhokseumawe  
⭐ **Pengalaman:** 15+ tahun di industri semen
🎯 **Kapasitas:** 500K+ ton semen per tahun
🏆 **Sertifikat:** ISO untuk jaminan kualitas

Kami berkomitmen menyediakan layanan pengantongan dan distribusi semen terbaik di Aceh dan Sumatera Utara.`
    }
    
    return `Terima kasih atas pertanyaan Anda! Saya adalah asisten AI PT. Yoga Wibawa Mandiri.

Saya dapat membantu Anda dengan informasi tentang:
- Layanan pengantongan semen
- Lokasi dan distribusi  
- Kontak perusahaan
- Produk Semen Padang
- Dan informasi perusahaan lainnya

Silakan tanyakan apa yang ingin Anda ketahui! 😊`
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const aiResponse = await getAIResponse(inputMessage)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-ywm-red to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce-slow"
        >
          <Bot size={24} />
        </Button>
        <div className="absolute -top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded opacity-75">
          AI Assistant
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
        isMinimized ? 'w-80 h-12' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-ywm-red to-red-700 text-white rounded-t-lg">
          <div className="flex items-center">
            <Bot size={20} className="mr-2" />
            <div>
              <h3 className="font-semibold text-sm">YWM AI Assistant</h3>
              <p className="text-xs opacity-90">
                {aiInitialized ? 'JS Puter AI' : 'Fallback AI'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1 h-auto"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="h-64 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-ywm-red text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.text}</div>
                      <div className={`text-xs mt-1 opacity-70 ${
                        message.sender === 'user' ? 'text-red-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tanyakan tentang PT. YWM..."
                  className="flex-1 text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  size="sm"
                  className="bg-ywm-red hover:bg-red-700"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default JSPuterAI
