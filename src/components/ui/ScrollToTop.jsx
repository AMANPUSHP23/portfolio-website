import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import useScrollPosition from '@/hooks/useScrollPosition';

const ScrollToTop = ({ 
  threshold = 300, 
  className = '',
  animation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.3 }
  }
}) => {
  const isVisible = useScrollPosition(threshold);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...animation}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            className
          )}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="rounded-full shadow-lg bg-primary/80 hover:bg-primary text-primary-foreground backdrop-blur-sm"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop; 