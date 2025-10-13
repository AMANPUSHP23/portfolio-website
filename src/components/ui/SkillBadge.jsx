
import React from 'react';
import { motion } from 'framer-motion';

const SkillBadge = ({ skill, index, className = '' }) => {
  const { name, level, icon: Icon } = skill;

  return (
    <motion.div
      className={`bg-card p-4 rounded-lg shadow-md flex flex-col items-center text-center border border-border hover:border-primary/50 transition-colors duration-300 ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
      role="article"
      tabIndex={0}
    >
      <div
        className="text-4xl mb-3 text-primary"
        role="img"
        aria-label={`${name} icon, ${level}% proficient`}
      >
        {Icon ? <Icon /> : <div className="w-10 h-10 bg-primary/20 rounded-full animate-pulse" role="presentation"></div>}
      </div>
      <h3 className="text-md font-semibold mb-1" role="heading" aria-level="3">{name}</h3>
      <div
        className="w-full bg-muted rounded-full h-2.5 mb-1"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Proficiency in ${name}: ${level}%`}
        aria-valuetext={`${level}%`}
      >
        <motion.div
          className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 h-2.5 rounded-full"
          style={{ width: `${level}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${level}%`}}
          transition={{ duration: 1, delay: 0.5 + index * 0.05, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{level}% Proficient</p>
    </motion.div>
  );
};

export default SkillBadge;
