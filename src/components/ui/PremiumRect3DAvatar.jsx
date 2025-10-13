import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * PremiumRect3DAvatar - Subtle, elegant 3D glassmorphism avatar card.
 * Props: src, alt, className
 */
export default function PremiumRect3DAvatar({ src, alt, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [6, -6]);
  const rotateY = useTransform(x, [-170, 170], [-6, 6]);

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
      className={`relative select-none flex items-center justify-center max-w-[330px] w-full h-auto ${className}`}
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.025 }}
    >
      {/* Soft blurred gradient halo */}
      <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/20 via-purple-600/15 to-pink-600/20 blur-2xl opacity-25 z-0" />
      {/* Glassmorphism card & avatar */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#181c22e6] via-[#23263acc] to-[#0b1220e6] backdrop-blur-xl flex flex-col items-center justify-center w-full h-full"
      >
        {/* Optional: minimal faint particles for depth */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%">
            {[...Array(5)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 340}
                cy={Math.random() * 220}
                r={Math.random() * 7 + 2}
                fill={['#38bdf8', '#a21caf', '#f472b6', '#facc15'][i % 4]}
                opacity={0.07 + Math.random() * 0.06}
              >
                <animate
                  attributeName="cy"
                  values={`${Math.random() * 220};${Math.random() * 220}`}
                  dur={`${4 + Math.random() * 2}s`}
                  repeatCount="indefinite"
                  keyTimes="0;1"
                />
              </circle>
            ))}
          </svg>
        </div>
        {/* Avatar */}
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl bg-background m-4 w-full h-full">
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full rounded-2xl"
            style={{ filter: 'contrast(1.11) brightness(1.06) saturate(1.13)' }}
            loading="eager"
            decoding="async"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
