
import React from 'react';
import useDarkMode from '@/hooks/useDarkMode';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        className="rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-accent/50 focus:ring-2 focus:ring-primary/50"
      >
        {theme === 'light' ? (
          <Sun className="h-6 w-6 text-yellow-500" />
        ) : (
          <Moon className="h-6 w-6 text-blue-300" />
        )}
      </Button>
    </motion.div>
  );
};

export default ThemeToggle;
