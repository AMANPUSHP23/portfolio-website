import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import useReducedMotion from '@/hooks/useReducedMotion';

const ParallaxSection = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
  offset = 50,
  ...props
}) => {
  const { scrollYProgress } = useScroll();
  const { shouldReduceMotion } = useReducedMotion();

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [offset, -offset] : [-offset, offset]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? [offset, -offset] : direction === 'right' ? [-offset, offset] : [0, 0]
  );

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + speed * 0.1]);

  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      style={{
        y: shouldReduceMotion ? 0 : y,
        x: shouldReduceMotion ? 0 : x,
        scale: shouldReduceMotion ? 1 : scale,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection; 