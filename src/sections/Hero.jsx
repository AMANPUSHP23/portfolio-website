import React, { useEffect, useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { scrollToSection } from '@/utils/scrollToSection';

import HeroParticles from '@/components/ui/HeroParticles';

const Hero = () => {
  const name = siteConfig.author; 
  // Using explicit apostrophe character
  const greeting = `I${String.fromCharCode(39)}m ${name}.`;
  const [typedGreeting, setTypedGreeting] = useState('');

  useEffect(() => {
    let i = 0;
    let typingInterval = null;

    const startTyping = () => {
      if (!greeting) return;

      typingInterval = setInterval(() => {
        if (i < greeting.length) {
          setTypedGreeting(greeting.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    };

    startTyping();

    return () => {
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [greeting]);


  const subtitleAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { delay: greeting.length * 0.1 + 0.3, duration: 0.5 } },
  };

  const buttonAnimation = (delay) => ({
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { delay: greeting.length * 0.1 + delay, type: 'spring', stiffness: 150 } },
  });


  return (
    <SectionWrapper id="hero" className="pt-20 sm:pt-28 md:pt-32 pb-6 sm:pb-12 min-h-[100vh] sm:min-h-[75vh] md:min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden" aria-label="Hero section">
      {/* Particle Animation Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <HeroParticles />
      </div>
      {/* SVG Grid Overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 z-10" aria-hidden="true" role="presentation">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(#heroGrid)" /></svg>
      </div>
      <div className="relative z-10 max-w-3xl px-4 sm:px-6" role="region" aria-label="Hero section">
        <motion.h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent min-h-[56px] xs:min-h-[64px] sm:min-h-[80px] md:min-h-[100px] flex items-center justify-center gap-2"
          initial={{opacity: 0, y: 40}}
          animate={{opacity: 1, y: 0}}
          transition={{duration:0.7, ease: 'easeOut'}}
          aria-live="polite"
        >
          <span>{typedGreeting}</span>
        </motion.h1>
        <motion.p 
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 sm:mb-10"
          variants={subtitleAnimation}
          initial="hidden"
          animate="show"
          role="heading"
          aria-level="2"
        >
          Cloud & DevOps Engineer specializing in CI/CD pipelines, automation, and scalable infrastructure.
        </motion.p>

        {/* Availability Badge */}
        {siteConfig.showAvailability && (
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: greeting.length * 0.1 + 2, type: "spring", stiffness: 150 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-medium">{siteConfig.availabilityText}</span>
          </motion.div>
        )}

        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-3 xs:gap-4 w-full max-w-xs xs:max-w-sm sm:max-w-none mx-auto"
          initial="hidden"
          animate="show"
          role="group"
          aria-label="Action buttons"
        >
          <motion.div variants={buttonAnimation(0.5)}>
            <Button 
              size="lg" 
              onClick={() => scrollToSection('projects')}
              className="group shadow-lg hover:shadow-primary/30 transition-shadow duration-300 transform hover:scale-105 w-full"
              role="button"
              aria-label="View my projects"
            >
              View My Work <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          {siteConfig.resumeUrl && (
            <motion.div variants={buttonAnimation(0.7)}>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = siteConfig.resumeUrl;
                  link.download = 'Aman_Pushp_CV.pdf';
                  link.target = '_blank';
                  link.rel = 'noopener noreferrer';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="group shadow-md hover:shadow-accent/30 transition-shadow duration-300 transform hover:scale-105 w-full"
                aria-label="Download my resume"
              >
                Download Resume <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
       <motion.div 
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: greeting.length * 0.1 + 1.2, duration: 0.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", repeatDelay: 2 }}
      >
        <button onClick={() => scrollToSection('about')} aria-label="Scroll to about section" className="p-2 rounded-full hover:bg-accent/50 transition-colors">
         <ArrowRight className="h-8 w-8 text-primary/50 rotate-90" />
        </button>
      </motion.div>
    </SectionWrapper>
  );
};

export default Hero;
