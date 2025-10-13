import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Premium3DAvatar - 3D parallax, dark glassy, premium animated avatar with neon border, spotlight, particles, and reflection.
 * Props: src, alt, className
 */
export default function Premium3DAvatar({ src, alt, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-120, 120], [16, -16]);
  const rotateY = useTransform(x, [-170, 170], [-18, 18]);

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
      className={`relative select-none flex items-center justify-center max-w-[320px] w-[320px] h-auto ${className}`}
      style={{ perspective: 1200, height: 'auto' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.045 }}
    >
      {/* Animated neon border */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="absolute inset-0 rounded-3xl border-4 border-transparent z-10 pointer-events-none"
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background:
              "conic-gradient(from 120deg, #38bdf8 0deg, #a21caf 120deg, #f472b6 240deg, #facc15 300deg, #38bdf8 360deg)",
            filter: "blur(8px)",
            opacity: 0.48,
            animation: "premium-3d-avatar-spin 6.5s linear infinite"
          }}
        />
        <div className="absolute inset-0 rounded-3xl border-2 border-white/10" />
      </motion.div>
      {/* Glassy dark card & avatar */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-20 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-[#181c22ee] via-[#23263acc] to-[#0b1220ee] backdrop-blur-xl flex flex-col items-center justify-center"
      >
        {/* Spotlight background */}
        <div className="absolute inset-0 rounded-3xl" style={{
          background: "radial-gradient(circle at 60% 40%, rgba(168,85,247,0.23) 0%, rgba(56,189,248,0.13) 60%, transparent 100%)",
          filter: "blur(24px)",
          zIndex: 0
        }} />
        {/* Floating particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg width="100%" height="100%">
            {[...Array(12)].map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 320}
                cy={Math.random() * 220}
                r={Math.random() * 8 + 2}
                fill={['#38bdf8', '#a21caf', '#f472b6', '#facc15'][i % 4]}
                opacity={0.13 + Math.random() * 0.14}
              >
                <animate
                  attributeName="cy"
                  values={`${Math.random() * 220};${Math.random() * 220}`}
                  dur={`${2.8 + Math.random() * 2}s`}
                  repeatCount="indefinite"
                  keyTimes="0;1"
                />
              </circle>
            ))}
          </svg>
        </div>
        {/* Avatar */}
        <div className="relative z-20 rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 bg-background mt-8 mb-4" style={{ width: 220, height: 220 }}>
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full"
            style={{ filter: 'contrast(1.13) brightness(1.08) saturate(1.19)' }}
            loading="eager"
            decoding="async"
          />
          {/* Reflection/Sheen */}
          <div
            className="absolute left-0 top-0 w-full h-full pointer-events-none rounded-2xl"
            style={{
              background:
                "linear-gradient(120deg, rgba(255,255,255,0.13) 18%, transparent 70%)",
              mixBlendMode: "screen",
              opacity: 0.32
            }}
          />
        </div>
        {/* Name/Title */}
        <div className="z-30 text-center mt-2 mb-8">
          <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">Aman Pushp</h3>
          <p className="text-base text-muted-foreground font-semibold">Full Stack Developer</p>
        </div>
      </motion.div>
      <style>{`
        @keyframes premium-3d-avatar-spin {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
