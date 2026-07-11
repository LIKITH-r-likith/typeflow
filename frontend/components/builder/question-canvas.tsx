"use client";

import { motion } from "framer-motion";
import { GripVertical, Trash2, Copy, Type } from "lucide-react";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useBuilderStore } from "@/store/builder-store";
import { cn } from "@/lib/utils";
import { SortableQuestion } from "./sortable-question";

const QUESTION_LABELS: Record<string, string> = {
  short_answer: "Short Answer",
  paragraph: "Paragraph",
  multiple_choice: "Multiple Choice",
  checkbox: "Checkbox",
  dropdown: "Dropdown",
  rating: "Rating",
  email: "Email",
  phone: "Phone",
  date: "Date",
};

export function QuestionCanvas() {
  const questions = useBuilderStore((state) => state.questions);

  const selectedQuestionId = useBuilderStore(
    (state) => state.selectedQuestionId
  );

  const selectQuestion = useBuilderStore(
    (state) => state.selectQuestion
  );

  const deleteQuestion = useBuilderStore(
    (state) => state.deleteQuestion
  );

  const duplicateQuestion = useBuilderStore(
    (state) => state.duplicateQuestion
  );

  const updateQuestion = useBuilderStore(
    (state) => state.updateQuestion
  );

  const moveQuestion = useBuilderStore(
    (state) => state.moveQuestion
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = questions.findIndex(
      (q) => q.id === active.id
    );

    const newIndex = questions.findIndex(
      (q) => q.id === over.id
    );

    if (oldIndex !== -1 && newIndex !== -1) {
      moveQuestion(oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={questions.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        <motion.div
          layout
          className="flex flex-col gap-5"
        >
          {/* Header */}

          <div className="mb-3 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-500">
                Builder
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                Questions
              </h2>

            </div>

            <div className="rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
              {questions.length} Question
              {questions.length !== 1 ? "s" : ""}
            </div>

          </div>

          {/* Empty State */}

          {questions.length === 0 && (

            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[30px] border-2 border-dashed border-violet-200 bg-white/70 p-10 backdrop-blur-xl">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl">

                <Type className="h-8 w-8" />

              </div>

              <h3 className="text-xl font-bold text-gray-900">
                Start Building
              </h3>

              <p className="mt-3 max-w-sm text-center text-sm leading-7 text-gray-500">
                Add your first question from the sidebar to begin creating your form.
              </p>

            </div>

          )}

          {/* Question Cards */}

          {questions.map((q) => (

            <SortableQuestion
              key={q.id}
              id={q.id}
            >

              <motion.div
                layout
                whileHover={{
                  y: -4,
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.99,
                }}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
                onClick={() => selectQuestion(q.id)}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/75 p-6 backdrop-blur-2xl transition-all duration-500 cursor-pointer",
                  "hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_20px_60px_rgba(124,58,237,.16)]",
                  selectedQuestionId === q.id
                    ? "border-violet-500 ring-2 ring-violet-200 shadow-xl shadow-violet-500/20"
                    : "border-gray-100"
                )}
              >

                {/* Animated Gradient Border */}

                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 opacity-0 transition-all duration-500 group-hover:opacity-100" />

                <div className="flex items-start gap-4">

                  {/* Drag Handle */}

                  <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 text-violet-500 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">

                    <GripVertical className="h-5 w-5" />

                  </div>

                  {/* Content */}

                  <div className="flex-1">

                    <div className="mb-3 flex items-center gap-2">

                      <span className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-md">

                        <Type className="h-3.5 w-3.5" />

                        {QUESTION_LABELS[q.type] ?? q.type}

                      </span>

                      {q.required && (

                        <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          Required
                        </span>

                      )}

                    </div>

                    <input
                      value={q.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        updateQuestion(q.id, {
                          title: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl px-3 py-3 text-lg font-semibold text-gray-900 outline-none transition-all duration-300 hover:bg-violet-50/60 focus:bg-violet-50"
                    />

                  </div>

                  {/* Actions */}

                  <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateQuestion(q.id);
                      }}
                      className="rounded-xl bg-white p-2 shadow-sm transition-all hover:scale-110 hover:bg-violet-100 hover:text-violet-700"
                    >
                      <Copy className="h-4 w-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteQuestion(q.id);
                      }}
                      className="rounded-xl bg-white p-2 shadow-sm transition-all hover:scale-110 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>

              </motion.div>

            </SortableQuestion>

          ))}

        </motion.div>

      </SortableContext>

    </DndContext>
  );
}