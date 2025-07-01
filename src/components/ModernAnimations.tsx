import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Page transition wrapper
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Fade in when in view
export const FadeInWhenVisible: React.FC<{ 
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  direction = 'up'
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50 };
      case 'down': return { y: -50 };
      case 'left': return { x: -50 };
      case 'right': return { x: 50 };
      default: return { y: 50 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const StaggerContainer: React.FC<{ 
  children: React.ReactNode;
  staggerDelay?: number;
}> = ({ children, staggerDelay = 0.1 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
  >
    {children}
  </motion.div>
);

export const StaggerChild: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

// Parallax scroll effect
export const ParallaxScroll: React.FC<{ 
  children: React.ReactNode;
  offset?: number;
}> = ({ children, offset = 50 }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div style={{ y: springY }}>
      {children}
    </motion.div>
  );
};

// Hover scale effect
export const HoverScale: React.FC<{ 
  children: React.ReactNode;
  scale?: number;
  className?: string;
}> = ({ children, scale = 1.05, className = '' }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: scale - 0.02 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Magnetic hover effect
export const MagneticHover: React.FC<{ 
  children: React.ReactNode;
  strength?: number;
}> = ({ children, strength = 20 }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      e.currentTarget.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)';
    }}
    style={{ transition: 'transform 0.3s ease' }}
  >
    {children}
  </motion.div>
);

// Floating animation
export const FloatingElement: React.FC<{ 
  children: React.ReactNode;
  duration?: number;
  amplitude?: number;
}> = ({ children, duration = 3, amplitude = 10 }) => (
  <motion.div
    animate={{ 
      y: [0, -amplitude, 0],
    }}
    transition={{ 
      duration,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    {children}
  </motion.div>
);

// Rotate on hover
export const RotateOnHover: React.FC<{ 
  children: React.ReactNode;
  degrees?: number;
}> = ({ children, degrees = 5 }) => (
  <motion.div
    whileHover={{ rotate: degrees }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {children}
  </motion.div>
);

// Counter animation
export const AnimatedCounter: React.FC<{ 
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}> = ({ value, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const animation = {
      start: 0,
      end: value,
      duration: duration * 1000
    };

    const startTime = Date.now();
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animation.duration, 1);
      const currentCount = Math.floor(animation.start + (animation.end - animation.start) * progress);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  }, [value, duration]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

// Typewriter effect
export const TypewriterText: React.FC<{ 
  text: string;
  delay?: number;
  speed?: number;
}> = ({ text, delay = 0, speed = 50 }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-5 bg-current ml-1"
      />
    </motion.span>
  );
};

// Gradient text animation
export const AnimatedGradientText: React.FC<{ 
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    className={`bg-gradient-to-r from-ywm-red via-pink-500 to-purple-600 bg-clip-text text-transparent ${className}`}
    animate={{
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'linear'
    }}
    style={{
      backgroundSize: '200% 200%'
    }}
  >
    {children}
  </motion.div>
);

export default {
  PageTransition,
  FadeInWhenVisible,
  StaggerContainer,
  StaggerChild,
  ParallaxScroll,
  HoverScale,
  MagneticHover,
  FloatingElement,
  RotateOnHover,
  AnimatedCounter,
  TypewriterText,
  AnimatedGradientText
};
