import React from 'react';
import { timeline } from '@/data/timeline';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { Briefcase, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  work: <Briefcase className="w-7 h-7 text-primary drop-shadow-glow" aria-label="Work experience" />,
  education: <GraduationCap className="w-7 h-7 text-primary drop-shadow-glow" aria-label="Education" />,
};

const Timeline = () => {
  return (
    <SectionWrapper id="timeline" aria-label="Experience and Education timeline">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">My Journey</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A timeline of my professional experience and education.
        </p>
      </div>
      <div className="relative max-w-4xl mx-auto">
        {/* Desktop: Full vertical timeline connector */}
        <div className="hidden md:block absolute left-1/2 top-0 w-1.5 h-full bg-gradient-to-b from-primary via-purple-400 to-pink-500 animate-gradient-move rounded-full opacity-60 -translate-x-1/2 pointer-events-none shadow-2xl z-0" aria-hidden="true"></div>
        <ul className="space-y-10">
          {timeline.map((item, idx) => {
            // Alternate left/right on desktop, vertical on mobile
            const isLeft = idx % 2 === 0;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 40 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.11, type: 'spring', stiffness: 60 }}
                className={`relative flex flex-col md:flex-row items-center group min-h-[140px] md:min-h-[180px] ${isLeft ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline Dot/Icon and Mobile Vertical Connector */}
                <span className="relative z-20 flex flex-col items-center w-full md:w-auto">
                  <span className="mx-auto w-14 h-14 flex items-center justify-center bg-glassmorphism-light dark:bg-glassmorphism-dark border-4 border-primary/70 rounded-full shadow-xl drop-shadow-glow animate-timeline-pulse">
                    <span className="absolute inset-0 pointer-events-none z-10 animate-timeline-sparkle">
                      <Sparkles className="w-6 h-6 text-pink-400/80 animate-spin-slow" aria-hidden="true" />
                    </span>
                    {iconMap[item.type]}
                  </span>
                  {/* Mobile: short vertical connector below icon */}
                  <div
                    className={`block md:hidden w-1.5 ${
                      idx === timeline.length - 1
                        ? 'h-6 opacity-30 blur-sm'
                        : 'h-10 opacity-60'
                    } bg-gradient-to-b from-primary via-purple-400 to-pink-500 rounded-full my-1`}
                  />
                </span>
                {/* Card */}
                <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:pl-8' : 'md:pl-16 md:pr-8'} mt-6 md:mt-0`} style={{ zIndex: 2 }}>

                  <motion.div
                    className="bg-glassmorphism-light dark:bg-glassmorphism-dark border border-primary/10 rounded-2xl shadow-2xl p-7 transition-all duration-500 hover:scale-105 hover:rotate-1 group-hover:shadow-primary/30 relative overflow-hidden"
                    whileHover={{ scale: 1.06, rotate: isLeft ? -1.5 : 1.5 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 drop-shadow-glow">
                        {item.title}
                      </h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary ml-2">
                        {item.type === 'work' ? 'Experience' : 'Education'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{item.institution}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 inline-block" aria-label="Location" />{item.location}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {item.start} – {item.end}
                    </div>
                    <p className="text-base text-foreground/90 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </SectionWrapper>
  );
};

export default Timeline;
