import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsCarousel = ({ testimonials = [], interval = 5000, className = '' }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [testimonials, interval]);

  if (!testimonials.length) return null;

  return (
    <div className={`relative w-full max-w-xl mx-auto ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
        >
          <img
            src={testimonials[current].avatar}
            alt={testimonials[current].name}
            className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-primary"
          />
          <p className="text-lg italic mb-2">"{testimonials[current].quote}"</p>
          <span className="font-semibold text-primary">{testimonials[current].name}</span>
          <span className="text-xs text-muted-foreground">{testimonials[current].role}</span>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${idx === current ? 'bg-primary' : 'bg-muted'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel; 