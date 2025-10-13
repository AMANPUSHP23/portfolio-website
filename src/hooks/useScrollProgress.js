import { useState, useEffect } from 'react';

const useScrollProgress = (options = {}) => {
  const {
    target = 'body',
    offset = 0,
    throttle = 100
  } = options;

  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    let timeoutId;
    let lastScrollY = window.scrollY;

    const calculateProgress = () => {
      const element = target === 'body' ? document.body : document.querySelector(target);
      if (!element) return;

      const scrollHeight = element.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY + offset) / scrollHeight;
      const boundedProgress = Math.min(Math.max(currentProgress, 0), 1);

      setProgress(boundedProgress);
      setScrollY(window.scrollY);
      setMaxScroll(scrollHeight);
    };

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        calculateProgress();
        timeoutId = null;
      }, throttle);
    };

    // Initial calculation
    calculateProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [target, offset, throttle]);

  return {
    progress,
    scrollY,
    maxScroll,
    isAtTop: scrollY <= 0,
    isAtBottom: scrollY >= maxScroll
  };
};

export default useScrollProgress; 