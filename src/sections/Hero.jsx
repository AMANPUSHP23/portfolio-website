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
  const greeting = `I 'm ${name}.`;
  const [typedGreeting, setTypedGreeting] = useState('');

  useEffect(() => {
    let i = 0;
    let typingInterval = null;

    const startTyping = () => {
      if (!greeting) return;

      typingInterval = setInterval(() => {
        if (i < greeting.length) {
          setTypedGreeting((prev) => {
            if (!prev) return greeting.charAt(i);
            return prev + greeting.charAt(i);
          });
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
    <SectionWrapper id="hero" className="pt-28 pb-12 min-h-[80vh] flex flex-col items-center justify-center text-center relative overflow-hidden" aria-label="Hero section">
      {/* Particle Animation Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <HeroParticles />
      </div>
      {/* SVG Grid Overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 z-10" aria-hidden="true" role="presentation">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(#heroGrid)" /></svg>
      </div>
      <div className="relative z-10 max-w-3xl px-4" role="region" aria-label="Hero section">
        <motion.h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent min-h-[56px] xs:min-h-[64px] sm:min-h-[80px] md:min-h-[100px] flex items-center justify-center gap-2"
          initial={{opacity: 0, y: 40}}
          animate={{opacity: 1, y: 0}}
          transition={{duration:0.7, ease: 'easeOut'}}
          aria-live="polite"
        >
          <span className="whitespace-pre">{typedGreeting}</span>
          {typedGreeting === greeting && (
            <>
              <motion.span
                className="inline-block"
                role="img"
                aria-label="Waving Hand Emoji"
                aria-hidden="true"
                animate={{ rotate: [0, 20, -10, 20, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                style={{ originX: 0.7, display: 'inline-block' }}
              >
                👋
              </motion.span>
              <span className="animate-ping visually-hidden" aria-hidden="true">|</span>
            </>
          )}
        </motion.h1>
        <motion.p 
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 xs:mb-10"
          variants={subtitleAnimation}
          initial="hidden"
          animate="show"
          role="heading"
          aria-level="2"
        >
          Cloud & DevOps Engineer specializing in CI/CD pipelines, automation, and scalable infrastructure.
        </motion.p>
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
                asChild 
                className="group shadow-md hover:shadow-accent/30 transition-shadow duration-300 transform hover:scale-105 w-full"
              >
                <a 
                  href={siteConfig.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  download
                  role="button"
                  aria-label="Download my resume"
                >
                  Download Resume <Download className="ml-2 h-5 w-5 group-hover:animate-bounce" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
       <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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
