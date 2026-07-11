"use client";

import { motion } from "framer-motion";
import { Wand2, Copy, Upload, LayoutTemplate } from "lucide-react";

const actions = [
  { label: "AI Form Generator", description: "Generate a form from a prompt", icon: Wand2 },
  { label: "Duplicate Form", description: "Copy an existing form", icon: Copy },
  { label: "Import Form", description: "Bring in forms from other tools", icon: Upload },
  { label: "Templates", description: "Start from a ready-made layout", icon: LayoutTemplate },
];

export function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="flex flex-col gap-2">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 shrink-0">
                <Icon className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{action.label}</div>
                <div className="text-xs text-gray-400">{action.description}</div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}