
import React from 'react';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { experiences } from '@/data/experience';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Rocket, Code, Laptop } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useRef } from 'react';

const iconMap = {
  Rocket: <Rocket className="h-7 w-7 text-primary" />, // slightly larger for effect
  Code: <Code className="h-6 w-6 text-primary" />,
  Laptop: <Laptop className="h-6 w-6 text-primary" />,
  Default: <Briefcase className="h-6 w-6 text-primary" />,
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1.2, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } },
  pulse: {
    scale: [1.2, 1.5, 1.2],
    boxShadow: [
      "0 0 0px 0px #a21caf55",
      "0 0 16px 8px #a21caf88",
      "0 0 0px 0px #a21caf55"
    ],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      type: "spring",
      stiffness: 100,
      damping: 18
    }
  })
};

const Experience = () => {
  // Ref for the most recent card
  const mostRecentRef = useRef(null);

  // Confetti burst handler
  const handleConfetti = () => {
    if (!mostRecentRef.current) return;
    const rect = mostRecentRef.current.getBoundingClientRect();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: ['#a21caf', '#ec4899', '#6366f1', '#fff'],
      scalar: 1.1,
      zIndex: 9999
    });
  };

  return (
    <SectionWrapper id="experience">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 drop-shadow-lg">Work Experience</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My professional journey and key roles I've undertaken.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {/* Timeline vertical line */}
        {/* Aurora/Neon animated background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-1/2 top-0 w-[60vw] h-[60vw] bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-blue-500/40 rounded-full blur-3xl animate-aurora -translate-x-1/2" />
          <div className="absolute right-1/3 bottom-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-primary/20 rounded-full blur-2xl animate-aurora2" />
        </div>
        {/* Animated glowing timeline line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full -translate-x-1/2 z-0"
          initial={{ boxShadow: '0 0 0px 0px #a21caf55' }}
          animate={{
            boxShadow: [
              '0 0 0px 0px #a21caf55',
              '0 0 32px 8px #a21caf88',
              '0 0 0px 0px #a21caf55'
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="flex flex-col gap-16 w-full max-w-4xl mx-auto relative z-10">
          {experiences.map((exp, i) => (
  <div key={exp.id} className="relative flex flex-col items-center w-full group py-2">
    {/* Timeline dot with animation and ripple */}
    <motion.div
      className="z-20 mb-2"
      variants={dotVariants}
      initial="hidden"
      whileInView="visible"
      animate="pulse"
      custom={i}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 border-4 border-background shadow-2xl flex items-center justify-center animate-float relative">
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-pink-500/30 blur-2xl opacity-60 animate-ripple"></span>
        {iconMap[exp.icon] || iconMap.Default}
      </div>
    </motion.div>

    {/* Experience card with animation */}
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.055, rotateZ: i % 2 === 0 ? 2 : -2, boxShadow: '0 8px 32px 0 #a21caf88' }}
      className={`relative w-full max-w-xl mx-auto bg-white/10 dark:bg-background/80 backdrop-blur-2xl border border-pink-500/40 rounded-3xl shadow-2xl p-8 hover:scale-[1.055] hover:shadow-pink-500/40 transition-all duration-300 group-hover:shadow-pink-500/20 overflow-hidden ${i === 0 ? 'ring-4 ring-pink-500/70 scale-110 border-pink-500/70 shadow-pink-500/40 most-recent-card' : ''}`}
      style={{ zIndex: 2 }}
      ref={i === 0 ? mostRecentRef : undefined}
      onMouseEnter={i === 0 ? handleConfetti : undefined}
      onMouseMove={i === 0 ? (e) => { /* placeholder for confetti */ } : undefined}
    >
      {/* Glass reflection overlay */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-full rounded-3xl overflow-hidden z-10">
        <div className="absolute left-0 top-0 w-2/3 h-1/4 bg-gradient-to-r from-white/60 to-transparent opacity-40 rotate-12 animate-glass-reflection" />
      </div>
      <div className="flex items-center mb-2">
        <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
          {exp.title}
        </h3>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-1">
        <MapPin size={16} className="mr-2" />
        <span>{exp.company}</span>
      </div>
      <div className="flex items-center text-sm text-muted-foreground mb-3">
        <Calendar size={16} className="mr-2" />
        <span>{exp.date}</span>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{exp.description}</p>
    </motion.div>
  </div>
))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Experience;
