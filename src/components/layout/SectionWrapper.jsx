import React from 'react';
import { motion } from 'framer-motion';

const SectionWrapper = ({ children, id, className = '',bgColor = 'bg-transparent' }) => {
  return (
    <motion.section
      id={id}
      className={`py-12 sm:py-16 md:py-20 lg:py-24 ${bgColor} ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:pl-20">
        {children}
      </div>
    </motion.section>
  );
};

export default SectionWrapper;
