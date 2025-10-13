import { useState, useEffect } from 'react';

const usePrefersColorScheme = () => {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') return;

    // Get initial color scheme
    const getColorScheme = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    };

    // Set initial value
    setColorScheme(getColorScheme());

    // Create media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Handle change
    const handleChange = (e) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return {
    colorScheme,
    isDark: colorScheme === 'dark',
    isLight: colorScheme === 'light'
  };
};

export default usePrefersColorScheme; 