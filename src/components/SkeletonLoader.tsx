import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'hero' | 'grid' | 'custom';
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'card', 
  count = 3,
  className = ""
}) => {
  const shimmerAnimation = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  const SkeletonBase: React.FC<{ className?: string; children?: React.ReactNode }> = ({ 
    className: baseClassName = "", 
    children 
  }) => (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-lg ${baseClassName}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        {...shimmerAnimation}
      />
      {children}
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg space-y-4">
      <div className="flex items-center space-x-4">
        <SkeletonBase className="w-16 h-16 rounded-xl" />
        <div className="space-y-2 flex-1">
          <SkeletonBase className="h-4 w-3/4" />
          <SkeletonBase className="h-3 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <SkeletonBase className="h-3 w-full" />
        <SkeletonBase className="h-3 w-5/6" />
        <SkeletonBase className="h-3 w-4/6" />
      </div>
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-8 w-24 rounded-lg" />
        <SkeletonBase className="h-8 w-16 rounded-lg" />
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <SkeletonBase className="w-12 h-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-4 w-2/3" />
          <SkeletonBase className="h-3 w-1/2" />
        </div>
        <SkeletonBase className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );

  const renderHeroSkeleton = () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <SkeletonBase className="h-12 w-3/4 mx-auto" />
        <SkeletonBase className="h-6 w-1/2 mx-auto" />
        <div className="flex justify-center space-x-4">
          <SkeletonBase className="h-12 w-32 rounded-xl" />
          <SkeletonBase className="h-12 w-32 rounded-xl" />
        </div>
      </div>
      <SkeletonBase className="h-64 w-full rounded-2xl" />
    </div>
  );

  const renderGridSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm space-y-3">
      <SkeletonBase className="h-32 w-full rounded-lg" />
      <SkeletonBase className="h-5 w-3/4" />
      <SkeletonBase className="h-4 w-full" />
      <SkeletonBase className="h-4 w-5/6" />
      <div className="flex justify-between items-center">
        <SkeletonBase className="h-6 w-20" />
        <SkeletonBase className="h-8 w-24 rounded-lg" />
      </div>
    </div>
  );

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'hero':
        return renderHeroSkeleton();
      case 'grid':
        return renderGridSkeleton();
      default:
        return renderCardSkeleton();
    }
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="mb-4 last:mb-0">
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

// Individual skeleton components for specific use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <SkeletonLoader type="card" count={1} className={className} />
);

export const SkeletonList: React.FC<{ className?: string; count?: number }> = ({ 
  className, 
  count = 5 
}) => (
  <SkeletonLoader type="list" count={count} className={className} />
);

export const SkeletonHero: React.FC<{ className?: string }> = ({ className }) => (
  <SkeletonLoader type="hero" count={1} className={className} />
);

export const SkeletonGrid: React.FC<{ className?: string; count?: number }> = ({ 
  className, 
  count = 6 
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    <SkeletonLoader type="grid" count={count} className="col-span-1" />
  </div>
);

// Text skeleton for inline content
export const SkeletonText: React.FC<{ 
  lines?: number; 
  className?: string;
  widths?: string[];
}> = ({ 
  lines = 3, 
  className = "", 
  widths = ['w-full', 'w-5/6', 'w-4/6'] 
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className={`h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${
          widths[index] || widths[widths.length - 1]
        }`}
      />
    ))}
  </div>
);

export default SkeletonLoader;
