import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useReducedMotion from '@/hooks/useReducedMotion';

const PageTransition = ({ 
  children, 
  className = '',
  mode = 'wait',
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
  transition = { duration: 0.3 }
}) => {
  const { getAnimationProps } = useReducedMotion();

  const animationProps = getAnimationProps(
    { initial, animate, exit, transition },
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 }
    }
  );

  return (
    <AnimatePresence mode={mode}>
      <motion.div
        className={cn('w-full', className)}
        {...animationProps}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 