"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle2, MessageSquare, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Forms", value: "48", icon: FileText, change: "+4 this month" },
  { label: "Published", value: "31", icon: CheckCircle2, change: "+2 this month" },
  { label: "Responses", value: "2,847", icon: MessageSquare, change: "+312 this month" },
  { label: "Completion Rate", value: "76%", icon: TrendingUp, change: "+3.2% this month" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50">
                <Icon className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-semibold text-gray-900">{stat.value}</div>
            <div className="mt-1 text-xs text-gray-400">{stat.change}</div>
          </motion.div>
        );
      })}
    </div>
  );
}