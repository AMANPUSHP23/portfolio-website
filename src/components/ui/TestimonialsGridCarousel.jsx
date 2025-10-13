import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Carousel that wraps any grid of testimonials. Shows N at a time, slides by N, keeps all original card styling.
 * Props:
 * - testimonials: array
 * - cardsPerSlide: number (default: 3 on desktop, 2 on md, 1 on mobile)
 * - renderCard: function (testimonial, idx) => JSX
 */
const TestimonialsGridCarousel = ({ testimonials = [], renderCard, cardsPerSlide = 3 }) => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  // Responsive cards per slide
  const [slideSize, setSlideSize] = useState(cardsPerSlide);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSlideSize(1);
      else if (window.innerWidth < 1024) setSlideSize(2);
      else setSlideSize(cardsPerSlide);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [cardsPerSlide]);

  // Next/prev logic
  const maxIndex = Math.max(0, Math.ceil(total / slideSize) - 1);
  const goTo = (idx) => setCurrent(Math.max(0, Math.min(idx, maxIndex)));
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  // Auto-slide feature
  useEffect(() => {
    if (maxIndex < 1) return; // Only auto-slide if more than one slide
    let paused = false;
    let timer;
    const startTimer = () => {
      timer = setInterval(() => {
        if (!paused) setCurrent((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
      }, 5000);
    };
    startTimer();
    return () => clearInterval(timer);
  }, [maxIndex]);

  // Pause auto-slide on user interaction
  const handleUserNav = (fn) => {
    return (...args) => {
      fn(...args);
    };
  };

  // Slice testimonials for this slide
  const start = current * slideSize;
  const end = start + slideSize;
  const visible = testimonials.slice(start, end);

  // Touch and mouse drag support
  const touch = React.useRef({ x: 0, y: 0, time: 0 });
  const handleTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };
  const handleTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    const dt = Date.now() - touch.current.time;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) && dt < 600) {
      if (dx < 0 && current < maxIndex) next(); // swipe left
      else if (dx > 0 && current > 0) prev(); // swipe right
    }
  };

  return (
    <div
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        touch.current = { x: e.clientX, y: e.clientY, time: Date.now(), dragging: true };
      }}
      onMouseMove={(e) => {
        if (!touch.current.dragging) return;
        touch.current.dx = e.clientX - touch.current.x;
        touch.current.dy = e.clientY - touch.current.y;
      }}
      onMouseUp={(e) => {
        if (!touch.current.dragging) return;
        const dx = e.clientX - touch.current.x;
        const dy = e.clientY - touch.current.y;
        const dt = Date.now() - touch.current.time;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) && dt < 600) {
          if (dx < 0 && current < maxIndex) next(); // swipe left
          else if (dx > 0 && current > 0) prev(); // swipe right
        }
        touch.current.dragging = false;
      }}
      onMouseLeave={() => { touch.current.dragging = false; }}
    >
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleUserNav(prev)}
          disabled={current === 0}
          className="p-1 rounded-full bg-zinc-800 text-primary/80 hover:bg-primary/20 disabled:opacity-30"
          aria-label="Previous testimonials"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`w-2.5 h-2.5 rounded-full ${idx === current ? 'bg-primary' : 'bg-muted'} transition-all`}
              onClick={handleUserNav(() => goTo(idx))}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleUserNav(next)}
          disabled={current === maxIndex}
          className="p-1 rounded-full bg-zinc-800 text-primary/80 hover:bg-primary/20 disabled:opacity-30"
          aria-label="Next testimonials"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          className={`grid gap-10 md:grid-cols-2 lg:grid-cols-3`}
        >
          {visible.map((testimonial, idx) => renderCard(testimonial, start + idx))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialsGridCarousel;
