import { useState, useEffect, useRef, useCallback } from 'react';

const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false
  } = options;

  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const frozen = useRef(false);

  const callback = useCallback(([entry]) => {
    setEntry(entry);
    setIsVisible(entry.isIntersecting);

    if (entry.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }
  }, [freezeOnceVisible]);

  useEffect(() => {
    const node = elementRef?.current;
    if (!node || frozen.current) return;

    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [callback, threshold, root, rootMargin]);

  return {
    ref: elementRef,
    entry,
    isVisible,
    reset: () => {
      frozen.current = false;
      setIsVisible(false);
    }
  };
};

export default useIntersectionObserver; 