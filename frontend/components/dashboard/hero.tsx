"use client";

import { motion } from "framer-motion";
import { Plus, Wand2 } from "lucide-react";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-500 px-10 py-14 text-white"
    >
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl">
        Build beautiful forms with AI
      </h1>
      <p className="mt-3 max-w-md text-indigo-100 text-sm md:text-base">
        Describe what you need, and let TypeFlow AI generate a polished, conversion-ready form in seconds.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors">
          <Plus className="h-4 w-4" />
          New Form
        </button>
        <button className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-colors">
          <Wand2 className="h-4 w-4" />
          Generate with AI
        </button>
      </div>
    </motion.section>
  );
}