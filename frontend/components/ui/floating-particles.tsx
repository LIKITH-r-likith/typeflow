"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.random() * 8 + 4,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 12 + 12,
  delay: Math.random() * 4,
}));
export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {particles.map((particle) => (

        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-violet-400/30 to-fuchsia-400/20"

          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}

          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.25, 0.7, 0.25],
            scale: [1, 1.4, 1],
          }}

          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />

      ))}

    </div>
  );
}