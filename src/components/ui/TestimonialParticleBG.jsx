import React from "react";
import { motion } from "framer-motion";

// Simple animated particle background for premium effect
export default function TestimonialParticleBG() {
  const particles = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-[#1e2746cc] via-[#00eaffcc] to-[#ffd700cc] opacity-30 blur-2xl"
          style={{
            width: `${16 + Math.random() * 32}px`,
            height: `${16 + Math.random() * 32}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 40 - 20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
