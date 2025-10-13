import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useReducedMotion from '@/hooks/useReducedMotion';

const LazyImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'blur',
  blurDataURL,
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isVisible, ref } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '50px',
    freezeOnceVisible: true
  });
  const { shouldReduceMotion } = useReducedMotion();

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoaded(true)}
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            className={cn(
              'w-full h-full object-cover transition-opacity duration-300',
              !isLoaded && 'opacity-0'
            )}
            {...props}
          />
        )}
      </AnimatePresence>
      
      {!isLoaded && placeholder === 'blur' && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-110"
        />
      )}
    </div>
  );
};

export default LazyImage; 