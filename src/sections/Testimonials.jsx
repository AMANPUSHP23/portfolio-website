
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { testimonials } from '@/data/testimonials';
import TestimonialsGridCarousel from '@/components/ui/TestimonialsGridCarousel';
import TestimonialParticleBG from '@/components/ui/TestimonialParticleBG';
const Testimonials = () => {
  // 3D Card Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.22 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.8, rotateX: 40 },
    show: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.7, type: 'spring', stiffness: 80, damping: 16 } },
  };

  // Parallax tilt effect
  function Card3D({ children, ...props }) {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [12, -12]);
    const rotateY = useTransform(x, [-50, 50], [-12, 12]);

    function handleMouseMove(e) {
      const rect = ref.current.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      x.set(px - rect.width / 2);
      y.set(py - rect.height / 2);
    }
    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }
    return (
      <motion.div
        ref={ref}
        style={{ perspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 4px #9f7aea44, 0 1.5px 8px 0 #fff2' }}
        animate={{}}
        className="group"
      >
        <motion.div
          style={{ rotateX, rotateY, boxShadow: '0 4px 32px 0 #000a, 0 1.5px 8px 0 #fff1' }}
          className="rounded-2xl bg-[#181f2e]/90 border-2 border-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-xl backdrop-blur-lg p-0 overflow-hidden transition-all duration-300"
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <SectionWrapper id="testimonials" className="py-12 font-[Poppins,sans-serif] relative overflow-hidden">
  <TestimonialParticleBG />
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-600 drop-shadow-[0_2px_24px_rgba(167,139,250,0.28)] tracking-tight">Testimonials</h2>
        <p className="text-base text-[#b8b8d1] max-w-2xl mx-auto font-medium">
          What others say about my work and collaboration.
        </p>
      </div>
      <TestimonialsGridCarousel
        testimonials={testimonials}
        renderCard={(testimonial, idx) => (
          <motion.div key={testimonial.id} variants={cardVariants} className="flex h-full">
            <Card3D>
              <div className="flex flex-col text-center h-full relative group rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 via-background/70 to-secondary/10 dark:from-primary/20 dark:via-background/80 dark:to-secondary/20 border border-primary/20 backdrop-blur-lg px-4 py-5 md:px-5 md:py-6">
                <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-br from-primary/20 via-purple-600/10 to-pink-600/10 opacity-80 blur-2xl rounded-2xl" />
                <div className="relative z-10 flex flex-col items-center pt-3 pb-1">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mb-2 border-2 border-primary shadow-[0_0_0_3px_rgba(168,85,247,0.14)] bg-gradient-to-br from-primary/30 via-purple-600/20 to-pink-600/20">
                    <img
                      className="w-full h-full object-cover"
                      alt={`Portrait of ${testimonial.name}, ${testimonial.title}`}
                      src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=23263a&color=fff&size=128`}
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-1 tracking-tight bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">{testimonial.name}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-1 font-semibold">{testimonial.title}</p>
                </div>
                <div className="flex-grow flex flex-col justify-center items-center px-2 pb-3">
                  {/* Quote icon intentionally omitted for compactness, add if needed */}
                  <p className="text-sm md:text-base text-foreground/90 italic leading-relaxed font-medium line-clamp-5">"{testimonial.quote}"</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-purple-600 to-pink-600 blur-[2px] opacity-80 animate-shimmer" />
              </div>
            </Card3D>
          </motion.div>
        )}
      />
    </SectionWrapper>
  );
};

export default Testimonials;
