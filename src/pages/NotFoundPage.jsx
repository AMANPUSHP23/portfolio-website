
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Seo from '@/components/Seo';
import { Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <>
      <Seo title="404 - Page Not Found" description="Oops! The page you're looking for doesn't exist." path="/404"/>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-background to-secondary/20 dark:to-secondary/30">
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        >
          <Search className="h-32 w-32 text-primary/50 mx-auto mb-8 animate-bounce" />
          <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-6">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
            It seems like the page you were looking for has taken a detour. Don't worry, let's get you back on track.
          </p>
          <motion.div
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.3, duration:0.5 }}
          >
            <Button asChild size="lg" className="group shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:scale-105">
              <Link to="/">
                <Home className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Go Back Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-0 left-0 w-full h-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: "100%", width: "100%;"}}>
            <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{stroke: "none", fill: "hsla(var(--primary)/0.1)"}}></path>
          </svg>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
