import React, { useState } from 'react';
import { Plus, MessageCircle, Phone, Mail, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: FloatingAction[] = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      action: () => window.open('https://wa.me/6282304433145?text=Halo,%20saya%20tertarik%20dengan%20produk%20PT.%20Yoga%20Wibawa%20Mandiri', '_blank'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'phone',
      label: 'Telepon',
      icon: <Phone size={20} />,
      action: () => window.open('tel:+6282304433145', '_self'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'email',
      label: 'Email',
      icon: <Mail size={20} />,
      action: () => window.open('mailto:info@yogawibawamandiri.com', '_self'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'location',
      label: 'Lokasi',
      icon: <MapPin size={20} />,
      action: () => window.open('https://maps.google.com/?q=Pelabuhan+Krueng+Geukueh+Lhokseumawe', '_blank'),
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="mb-4 space-y-3">
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  scale: 0.8,
                  transition: { delay: (actions.length - index - 1) * 0.05 }
                }}
                onClick={action.action}
                className={`${action.color} text-white p-3 rounded-full shadow-lg transform transition-all duration-200 
                          hover:scale-110 active:scale-95 flex items-center space-x-3 group`}
              >
                {action.icon}
                <span className="pr-2 text-sm font-medium opacity-100 group-hover:opacity-100 transition-opacity">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={toggleFAB}
        className="bg-gradient-to-r from-ywm-red to-red-600 hover:from-red-600 hover:to-red-700 
                 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 
                 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton;
