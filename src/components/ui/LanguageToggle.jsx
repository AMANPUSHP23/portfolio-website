import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageToggle = ({ className = '' }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className={`relative ${className}`}
      aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
    >
      <motion.div
        key={language}
        initial={{ scale: 0.8, opacity: 0, rotate: -180 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-1"
      >
        <Languages className="h-5 w-5" />
        <span className="text-xs font-bold uppercase">
          {language}
        </span>
      </motion.div>
    </Button>
  );
};

export default LanguageToggle;
