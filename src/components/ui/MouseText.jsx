import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useMousePosition from '@/hooks/useMousePosition';
import useReducedMotion from '@/hooks/useReducedMotion';

const MouseText = ({
  text,
  icon,
  className = '',
  color = 'primary',
  size = 'md',
  offset = { x: 20, y: 20 }
}) => {
  const { position, isHovering } = useMousePosition();
  const { shouldReduceMotion } = useReducedMotion();

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    white: 'text-white',
    black: 'text-black'
  };

  if (shouldReduceMotion || !isHovering) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={cn(
          'fixed pointer-events-none z-50',
          sizeClasses[size],
          colorClasses[color],
          className
        )}
        style={{
          left: position.x + offset.x,
          top: position.y + offset.y,
          transform: 'translate(-50%, -50%)'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </motion.div>
    </AnimatePresence>
  );
};

export default MouseText; 