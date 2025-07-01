import React from 'react';
import { motion } from 'framer-motion';
import SkeletonLoader from './SkeletonLoader';

// Enhanced loading spinner with company branding
export const ModernLoadingSpinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}> = ({ 
  size = 'md', 
  color = 'text-ywm-red',
  text = 'Memuat...'
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-gray-700 border-t-transparent rounded-full ${color}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ borderTopColor: 'currentColor' }}
      />
      <motion.p
        className="mt-4 text-gray-600 dark:text-gray-400 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};

// Page loading with company logo
export const PageLoading: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img 
          src="/ywm-logo-modern.svg" 
          alt="PT. Yoga Wibawa Mandiri"
          className="w-24 h-24 mx-auto drop-shadow-2xl dark:filter dark:brightness-0 dark:invert"
        />
      </motion.div>
      <motion.h2
        className="text-2xl font-bold text-ywm-dark dark:text-white mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        PT. Yoga Wibawa Mandiri
      </motion.h2>
      <ModernLoadingSpinner text="Memuat halaman..." />
    </div>
  </div>
);

// Smart loading for different content types
export const SmartLoader: React.FC<{
  type: 'page' | 'content' | 'data' | 'image';
  title?: string;
}> = ({ type, title }) => {
  const getLoaderContent = () => {
    switch (type) {
      case 'page':
        return <SkeletonLoader type="hero" count={1} />;
      case 'content':
        return <SkeletonLoader type="card" count={3} />;
      case 'data':
        return <SkeletonLoader type="list" count={5} />;
      case 'image':
        return <SkeletonLoader type="grid" count={6} />;
      default:
        return <ModernLoadingSpinner />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {title && (
        <motion.h3
          className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h3>
      )}
      {getLoaderContent()}
    </motion.div>
  );
};

// Progress bar loading
export const ProgressLoader: React.FC<{
  progress: number;
  text?: string;
}> = ({ progress, text = 'Memuat...' }) => (
  <div className="w-full max-w-md mx-auto p-6">
    <div className="text-center mb-4">
      <p className="text-gray-700 dark:text-gray-300 font-medium">{text}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {Math.round(progress)}%
      </p>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <motion.div
        className="bg-gradient-to-r from-ywm-red to-red-600 h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  </div>
);

// Dots loading animation
export const DotsLoader: React.FC<{ 
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  color = 'bg-ywm-red',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${color} ${sizeClasses[size]} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Pulsing logo loader
export const PulsingLogo: React.FC = () => (
  <div className="flex items-center justify-center p-8">
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <img 
        src="/ywm-logo-modern.svg" 
        alt="Loading..."
        className="w-16 h-16 drop-shadow-lg dark:filter dark:brightness-0 dark:invert"
      />
    </motion.div>
  </div>
);

export default {
  ModernLoadingSpinner,
  PageLoading,
  SmartLoader,
  ProgressLoader,
  DotsLoader,
  PulsingLogo
};
