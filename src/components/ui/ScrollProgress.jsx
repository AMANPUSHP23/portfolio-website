import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import useReducedMotion from '@/hooks/useReducedMotion';

const ScrollProgress = ({ 
  className = '',
  color = 'primary',
  height = 2,
  position = 'top'
}) => {
  const { scrollYProgress } = useScroll();
  const { shouldReduceMotion } = useReducedMotion();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0'
  };

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent'
  };

  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50',
        positionClasses[position],
        className
      )}
      style={{
        height: `${height}px`,
        scaleX: shouldReduceMotion ? undefined : scaleX,
        transformOrigin: '0%'
      }}
    >
      <div className={cn(
        'h-full w-full',
        colorClasses[color]
      )} />
    </motion.div>
  );
};

export default ScrollProgress; 