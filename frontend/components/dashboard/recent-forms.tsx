"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, FileText } from "lucide-react";

import { getForms, FormApiResponse } from "@/services/forms";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  published: "bg-emerald-100 text-emerald-700",
  archived: "bg-amber-100 text-amber-700",
};

export function RecentForms() {
  const [forms, setForms] = useState<FormApiResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForms() {
      try {
        const data = await getForms();
        setForms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadForms();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[28px] border border-white/50 bg-white/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-500">
            Dashboard
          </p>

          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Recent Forms
          </h2>
        </div>

        <span className="rounded-xl bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
          {forms.length} Forms
        </span>
      </div>

      {loading ? (
        <div className="space-y-4 p-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <FileText className="mb-4 h-12 w-12 text-violet-300" />

          <h3 className="text-lg font-semibold text-gray-800">
            No Forms Yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Create your first form from the Builder.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {forms.map((form) => (
            <motion.div
              key={form.id}
              whileHover={{
                scale: 1.01,
                x: 4,
              }}
              className="flex cursor-pointer items-center justify-between px-6 py-5 transition-all hover:bg-violet-50/40"
            >
              <div>
                <h3 className="font-semibold text-gray-900">
                  {form.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {form.description || "No description"}
                </p>
              </div>

              <div className="flex items-center gap-5">
                <span
                  className={cn(
                    "rounded-xl px-3 py-1 text-xs font-semibold capitalize",
                    statusStyles[form.status] ??
                      "bg-gray-100 text-gray-700"
                  )}
                >
                  {form.status}
                </span>

                <span className="text-xs text-gray-400">
                  #{form.id}
                </span>

                <button className="rounded-xl p-2 transition hover:bg-gray-100">
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}