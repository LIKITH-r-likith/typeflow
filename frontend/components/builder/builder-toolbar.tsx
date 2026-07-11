"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Eye,
  Save,
  Share2,
  Undo2,
  Redo2,
  Loader2,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

import { createForm } from "@/services/forms";
import { createQuestion } from "@/services/questions";
import { useBuilderStore } from "@/store/builder-store";

export function BuilderToolbar() {
  const [isSaving, setIsSaving] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    formTitle,
    formDescription,
    questions,
    setFormTitle,
  } = useBuilderStore();

  const showToast = (
    type: "success" | "error",
    message: string
  ) => {
    setToast({ type, message });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const form = await createForm({
        title: formTitle,
        description: formDescription,
        status: "draft",
        user_id: 1,
      });

      await Promise.all(
        questions.map((q) =>
          createQuestion({
            form_id: form.id,
            title: q.title,
            description: q.description,
            type: q.type,
            required: q.required,
            placeholder: q.placeholder,
            order: q.order,
          })
        )
      );

      showToast("success", "Form saved successfully");
    } catch (e) {
      console.error(e);
      showToast("error", "Failed to save form");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-20 items-center justify-between px-8">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <button className="rounded-2xl border border-white/60 bg-white/70 p-3 shadow-sm transition-all hover:scale-105 hover:shadow-md">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>

            <div className="flex flex-col">

              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                TypeFlow Builder
              </span>

              <input
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="Untitled Form"
                className="bg-transparent text-2xl font-bold text-gray-900 outline-none transition-all focus:text-indigo-600"
              />

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">

            <button className="rounded-xl border border-white/60 bg-white/70 p-3 transition hover:scale-105 hover:shadow-md">
              <Undo2 className="h-4 w-4 text-gray-600" />
            </button>

            <button className="rounded-xl border border-white/60 bg-white/70 p-3 transition hover:scale-105 hover:shadow-md">
              <Redo2 className="h-4 w-4 text-gray-600" />
            </button>

            <div className="mx-1 h-7 w-px bg-gray-200" />

            <button className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition hover:scale-105 hover:shadow-md">
              <Eye className="h-4 w-4" />
              Preview
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 transition hover:scale-105 hover:shadow-md">
              <Share2 className="h-4 w-4" />
              Share
            </button>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={handleSave}
              disabled={isSaving}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  Save Form
                </>
              )}
            </motion.button>

          </div>

        </div>
      </header>

      {toast && (
        <div
          className={`fixed right-6 top-6 z-[999] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl backdrop-blur-xl transition-all ${
            toast.type === "success"
              ? "border border-emerald-200 bg-emerald-50/95 text-emerald-700"
              : "border border-red-200 bg-red-50/95 text-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}

          <span className="font-medium">
            {toast.message}
          </span>
        </div>
      )}
    </>
  );
}