import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

const useReducedMotion = () => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    setShouldReduceMotion(prefersReducedMotion);
  }, [prefersReducedMotion]);

  const getAnimationProps = (animation, reducedAnimation = {}) => {
    if (shouldReduceMotion) {
      return {
        ...reducedAnimation,
        transition: {
          duration: 0.1,
          ...reducedAnimation.transition,
        },
      };
    }

    return animation;
  };

  return {
    shouldReduceMotion,
    getAnimationProps,
  };
};

export default useReducedMotion; 