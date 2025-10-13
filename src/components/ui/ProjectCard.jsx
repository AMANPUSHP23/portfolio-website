import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, featured }) => {
  const { title, description, image, tags, liveUrl, repoUrl } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, type: 'spring', bounce: 0.28 }}
      whileHover={{ rotateY: 8, rotateX: -2, scale: 1.045, boxShadow: '0 8px 32px rgba(99,102,241,0.15)' }}
      className={`relative transition-transform duration-300 ${featured ? 'z-10 scale-105' : ''}`}
    >
      <Card className={`relative overflow-hidden h-full flex flex-col group border-2 rounded-3xl bg-white/10 dark:bg-background/80 backdrop-blur-xl shadow-2xl transition-all duration-300 ${featured ? 'border-primary/70 shadow-primary/40' : 'border-border hover:border-primary/60 hover:shadow-2xl'}`}>
        <div className="relative overflow-hidden h-48 md:h-56">
          <img 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.4,2,.3,1)] group-hover:scale-110" 
            src={image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"}
            alt={image ? `${title} project screenshot` : `Project screenshot placeholder for ${title}`}
            loading="lazy"
          />
          {/* Soft gradient overlay on image hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-primary/30 group-hover:to-pink-500/10 transition-colors duration-500"></div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-bold text-white/90 relative">
            {title}
            {/* Accent underline */}
            <span className="block mt-1 w-8 h-1 bg-gradient-to-r from-primary via-pink-500 to-purple-500 rounded-full"></span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground mb-3 h-20 overflow-y-auto">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full font-semibold shadow-sm transition-all duration-300 hover:bg-primary/20 hover:shadow-[0_0_8px_2px_rgba(236,72,153,0.25)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-3 mt-auto pt-4 border-t border-border">
          {repoUrl && repoUrl !== "#" && (
            <Button asChild variant="outline" size="sm" className="font-medium border-2 border-border hover:border-primary/70 hover:bg-primary/10 transition-all duration-300">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Github className="mr-2 h-4 w-4" /> Code
              </a>
            </Button>
          )}
          {liveUrl && liveUrl !== "#" && (
            <Button asChild variant="default" size="sm" className="font-medium border-2 border-primary/60 bg-primary/80 hover:bg-primary/90 hover:shadow-lg transition-all duration-300">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" /> Live
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
