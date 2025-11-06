import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useReducedMotion from '@/hooks/useReducedMotion';

/**
 * Enhanced Page Transition with multiple animation variants
 */

const transitionVariants = {
  // Fade animations
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
  // Slide from bottom
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  
  // Slide from right
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.4, ease: 'easeInOut' }
  },
  
  // Scale animation
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  
  // Blur animation
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' },
    transition: { duration: 0.4 }
  },
  
  // Zoom in
  zoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }
  },
  
  // Rotate fade
  rotateFade: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 },
    transition: { duration: 0.4 }
  },
  
  // Slide and scale combo
  slideScale: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.95 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

const EnhancedPageTransition = ({ 
  children, 
  className = '',
  variant = 'slideUp',
  mode = 'wait',
  custom
}) => {
  const { getAnimationProps } = useReducedMotion();
  
  const selectedVariant = transitionVariants[variant] || transitionVariants.slideUp;
  
  const animationProps = getAnimationProps(
    selectedVariant,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 }
    }
  );

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        className={cn('w-full', className)}
        custom={custom}
        {...animationProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Stagger Children Wrapper
 */
export const StaggerContainer = ({ 
  children, 
  className,
  staggerDelay = 0.1,
  delayChildren = 0
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delayChildren
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Stagger Item (use inside StaggerContainer)
 */
export const StaggerItem = ({ children, className, variant = 'slideUp' }) => {
  const itemVariants = {
    hidden: transitionVariants[variant]?.initial || { opacity: 0, y: 20 },
    visible: transitionVariants[variant]?.animate || { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Route transition wrapper for React Router
 */
export const RouteTransition = ({ children, variant = 'slideUp' }) => {
  return (
    <EnhancedPageTransition variant={variant} mode="wait">
      {children}
    </EnhancedPageTransition>
  );
};

export default EnhancedPageTransition;
