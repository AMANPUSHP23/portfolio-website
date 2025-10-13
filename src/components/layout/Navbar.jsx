import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import ThemeToggle from '@/components/layout/ThemeToggle';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/utils/scrollToSection';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import useScrollSpy from '@/hooks/useScrollSpy';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds = siteConfig.navItems.map(item => item.href);
  const activeSection = useScrollSpy(sectionIds, { rootMargin: "-50% 0px -50% 0px" });


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: "0%", transition: { duration: 0.3, ease: "easeInOut" } }
  };
  
  const handleLinkClick = (href) => {
    scrollToSection(href);
    setIsOpen(false); 
  };

  const navName = siteConfig.name.split(' ')[0];

  return (
    <nav
      className={`navbar-outer-3d fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'navbar-dark-3d navbar-dark-glow navbar-shrink'
          : 'navbar-dark-3d'
      }`}
      style={{backdropFilter: 'blur(28px)'}}
    >
      <div className="relative">
        {/* Animated gradient border */}
        <div className="absolute -inset-1 rounded-2xl pointer-events-none animate-gradient-border-3d z-0"></div>
        <div className="relative container mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between h-20">
          {/* SVG Logo fallback */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick("#hero"); }}
            className="flex items-center gap-3 group cursor-pointer select-none"
            aria-label="Home"
          >
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-purple-900 via-zinc-900 to-primary shadow-3d-logo ring-4 ring-primary/30 group-hover:scale-110 transition-transform duration-200">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" fill="url(#paint0_radial_dark)" stroke="#fff" strokeWidth="2"/><text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold" dy=".3em">{navName[0]}</text><defs><radialGradient id="paint0_radial_dark" cx="0" cy="0" r="1" gradientTransform="translate(24 24) scale(24)" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1"/><stop offset="1" stopColor="#18181b"/></radialGradient></defs></svg>
            </span>
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-500 group-hover:opacity-80 transition-opacity drop-shadow-glow">
              {navName}
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-2">
            {siteConfig.navItems.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.href)}
                className={`relative px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary/80 shadow-3d-nav bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 border border-zinc-800/80 group nav-link-3d ${activeSection === item.href.substring(1) ? 'text-primary bg-gradient-to-r from-primary via-purple-700 to-pink-600 shadow-3d-active scale-105 border-primary/80' : 'text-zinc-200 hover:text-primary hover:border-primary/60'}`}
                aria-label={item.label}
                style={{boxShadow: activeSection === item.href.substring(1) ? '0 4px 32px 0 #a21caf44, 0 2px 8px 0 #18181b99' : undefined}}
              >
                <span className="relative z-10">{item.label}</span>
                {/* Animated underline */}
                <span className="nav-underline-3d absolute left-6 right-6 bottom-1 h-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-center"/>
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-full bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 border border-zinc-800/80 shadow-3d-nav focus:outline-none focus:ring-2 focus:ring-primary/80 hover:scale-110 transition-transform"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          {/* Overlay for click-outside-to-close */}
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          {/* Centered modal menu */}
          <div
            className="md:hidden fixed top-6 left-1/2 z-50 -translate-x-1/2 max-w-[18rem] w-[90vw] max-h-[90vh] overflow-y-auto bg-zinc-950/95 rounded-xl border border-zinc-800 shadow-2xl flex flex-col items-center p-2 sm:p-3 animate-fade-in"
            aria-modal="true"
            role="dialog"
          >
            <button
              className="absolute top-1 right-1 text-zinc-200 hover:text-primary transition-colors text-lg focus:outline-none bg-zinc-900/80 rounded-full p-1"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              style={{zIndex: 10}}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center w-full space-y-1 mt-1">
              {siteConfig.navItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.href)}
                  className={`w-full text-center py-1 px-2 text-xs font-medium rounded-md transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary/80 bg-gradient-to-br from-zinc-900/80 to-zinc-800/60 border border-zinc-800/80 group nav-link-3d ${activeSection === item.href.substring(1) ? 'text-primary bg-gradient-to-r from-primary via-purple-700 to-pink-600 shadow-3d-active scale-105 border-primary/80' : 'text-zinc-200 hover:text-primary hover:border-primary/60'}`}
                  aria-label={item.label}
                  style={{boxShadow: activeSection === item.href.substring(1) ? '0 4px 32px 0 #a21caf44, 0 2px 8px 0 #18181b99' : undefined}}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="nav-underline-3d absolute left-2 right-2 bottom-0.5 h-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 origin-center"/>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
