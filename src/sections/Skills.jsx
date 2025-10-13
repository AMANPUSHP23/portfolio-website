
import React, { useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import SkillBadge from '@/components/ui/SkillBadge';
import { allSkills, skillCategories } from '@/data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Cloud");

  const filteredSkills = allSkills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">Technical Expertise</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Specialized in Cloud Infrastructure, DevOps, and CI/CD with hands-on AWS experience and Infrastructure as Code.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {skillCategories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className="transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={activeCategory} 
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <SkillBadge key={skill.name} skill={skill} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
};

export default Skills;
