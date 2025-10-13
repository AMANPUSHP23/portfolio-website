import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import useMousePosition from '@/hooks/useMousePosition';
import useReducedMotion from '@/hooks/useReducedMotion';

const MouseFollower = ({
  className = '',
  size = 20,
  color = 'primary',
  mixBlendMode = 'difference',
  springConfig = {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  },
  enabled = true,
  bounds = null
}) => {
  const { position, isMoving, velocity, isHovering } = useMousePosition({ enabled, bounds });
  const { shouldReduceMotion } = useReducedMotion();
  const followerRef = useRef(null);

  // Use motion values for smoother animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Spring animations
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  useEffect(() => {
    if (!enabled || shouldReduceMotion) return;

    // Update motion values
    x.set(position.x);
    y.set(position.y);
    scale.set(isMoving ? 1.2 : 1);

    // Handle visibility
    if (followerRef.current) {
      followerRef.current.style.display = isHovering ? 'block' : 'none';
    }
  }, [position, isMoving, isHovering, enabled, shouldReduceMotion, x, y, scale]);

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    white: 'bg-white',
    black: 'bg-black'
  };

  if (shouldReduceMotion || !enabled) return null;

  return (
    <motion.div
      ref={followerRef}
      className={cn(
        'fixed pointer-events-none z-50 rounded-full',
        colorClasses[color],
        className
      )}
      style={{
        width: size,
        height: size,
        x: springX,
        y: springY,
        scale: springScale,
        mixBlendMode,
        translateX: '-50%',
        translateY: '-50%',
        display: isHovering ? 'block' : 'none'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default MouseFollower; 