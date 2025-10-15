import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react'; // Added Instagram, Dribbble
import { siteConfig } from '@/config/siteConfig'; // Ensure this path is correct

const iconComponents = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram, 
  dribbble: Dribbble,
};

const SocialIcons = ({ links, direction = 'vertical', className = '' }) => {
  const socialLinksArray = Object.entries(links)
    .map(([key, value]) => ({
      name: key,
      url: value,
      IconComponent: iconComponents[key.toLowerCase()],
    }))
    .filter(link => link.IconComponent && link.url && link.url !== '#');

  if (socialLinksArray.length === 0) {
    return null;
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.5, // Delay appearance of social icons
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: direction === 'vertical' ? 20 : 0, x: direction === 'horizontal' ? 20 : 0 },
    visible: { opacity: 1, y: 0, x: 0 },
    hover: { scale: 1.25, color: "hsl(var(--primary))", boxShadow: '0 4px 16px rgba(99,102,241,0.15)' },
    tap: { scale: 0.95 }
  };

  const baseClasses = "fixed z-40 flex";
  const directionClasses = direction === 'vertical' 
    ? "flex-col space-y-4 left-4 top-1/2 transform -translate-y-1/2 hidden xl:flex" // Only show on xl screens (1280px+) for vertical
    : "flex-row space-x-4 bottom-5 left-1/2 transform -translate-x-1/2 xl:hidden"; // Only show below xl for horizontal
  
  return (
    <motion.div
      className={`${baseClasses} ${directionClasses} ${className} p-2 bg-card/30 dark:bg-card/50 backdrop-blur-sm rounded-lg shadow-lg`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinksArray.map(({ name, url, IconComponent }) => (
        <motion.a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow ${siteConfig.author} on ${name}`}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <IconComponent size={24} />
        </motion.a>
      ))}
    </motion.div>
  );
};

// Default horizontal icons for mobile (can be overridden by passing props)
const MobileSocialIcons = () => <SocialIcons links={siteConfig.socialLinks} direction="horizontal" />;

// Default vertical icons for desktop
const DesktopSocialIcons = () => <SocialIcons links={siteConfig.socialLinks} direction="vertical" />;


export { MobileSocialIcons, DesktopSocialIcons }; // Exporting these for specific use if needed
export default SocialIcons; // Default export for general use
