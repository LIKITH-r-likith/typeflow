"use client";

import { motion } from "framer-motion";

export function BackgroundBlobs() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[-220px] top-[-180px] h-[520px] w-[520px] rounded-full bg-violet-500/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 70, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[-220px] bottom-[-180px] h-[540px] w-[540px] rounded-full bg-fuchsia-500/20 blur-[160px]"
      />

      <motion.div
        animate={{
          y: [0, 50, 0],
          x: [0, 40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-1/3 top-1/3 h-[340px] w-[340px] rounded-full bg-indigo-400/15 blur-[120px]"
      />
    </>
  );
}