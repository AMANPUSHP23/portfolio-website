
import React from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const iconVariants = {
    hover: { scale: 1.2, rotate: 5 },
    tap: { scale: 0.9 }
  };

  return (
    <footer className="relative w-full mt-20 border-t border-border/40 bg-neutral-950/95 dark:bg-neutral-900/95 shadow-lg">
      <div className="max-w-xl mx-auto flex flex-col items-center text-center px-6 py-1">
        <span className="text-xs font-semibold text-foreground">&copy; {currentYear} {siteConfig.author}. All rights reserved.</span>
        <div className="flex flex-row items-center justify-center gap-1 text-xs text-muted-foreground/80">
          <button className="hover:underline bg-transparent border-none p-0 cursor-pointer text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Privacy Policy</button>
          <span aria-hidden="true">&bull;</span>
          <button className="hover:underline bg-transparent border-none p-0 cursor-pointer text-xs text-muted-foreground/80 hover:text-foreground transition-colors">Terms of Service</button>
        </div>
        <div className="w-full border-t border-border/40 my-0" />
        <p className="text-xs text-muted-foreground/50 font-normal">
          Registered in India | CIN: U12345MH2025PTC000000 | 123 Corporate Ave, Mumbai
        </p>
      </div>
    </footer>
  );
};

export default Footer;
