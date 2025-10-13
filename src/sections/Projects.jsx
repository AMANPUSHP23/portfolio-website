
import React, { useState } from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectsGridCarousel from '@/components/ui/ProjectsGridCarousel';
import { projects, projectCategories } from '@/data/projects';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <SectionWrapper id="projects">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">My Projects</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A showcase of my Cloud & DevOps infrastructure projects and Full Stack MERN applications.
        </p>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {projectCategories.map(category => (
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

      <ProjectsGridCarousel
        key={activeCategory}
        projects={filteredProjects}
        renderCard={(project, idx) => (
          <ProjectCard key={project.id} project={project} />
        )}
      />
    </SectionWrapper>
  );
};

export default Projects;
