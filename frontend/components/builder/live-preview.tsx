"use client";

import { motion } from "framer-motion";
import { useBuilderStore } from "@/store/builder-store";

export function LivePreview() {
  const { formTitle, formDescription, questions } = useBuilderStore();

  return (
    <div className="flex justify-center">

      <div className="relative">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 rounded-[50px] bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-indigo-500/20 blur-3xl" />

        {/* Phone */}
        <div className="relative w-[360px] overflow-hidden rounded-[42px] border-[10px] border-neutral-900 bg-black shadow-[0_40px_100px_rgba(0,0,0,0.25)]">

          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />

          {/* Screen */}
          <div className="h-[720px] overflow-y-auto bg-gradient-to-b from-[#fbfbfd] to-[#f3f5ff] px-6 pb-10 pt-12">

            <div className="space-y-6">

              {/* Header */}

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-500">
                  Live Preview
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {formTitle || "Untitled Form"}
                </h2>

                <p className="mt-2 text-sm leading-7 text-gray-500">
                  {formDescription || "Form description..."}
                </p>

              </div>

              {/* Empty */}

              {questions.length === 0 && (

                <motion.div
                  layout
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="rounded-3xl border border-dashed border-violet-200 bg-violet-50/40 p-8 text-center"
                >

                  <p className="font-medium text-gray-500">
                    Nothing to preview yet.
                  </p>

                </motion.div>

              )}

              {/* Questions */}

              {questions.map((question, index) => (

                <motion.div
                  key={question.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur-xl"
                >

                  <div className="flex items-center gap-2">

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                      {index + 1}
                    </span>

                    <h3 className="font-semibold text-gray-900">
                      {question.title}
                    </h3>

                    {question.required && (
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                        Required
                      </span>
                    )}

                  </div>

                  {question.description && (
                    <p className="mt-3 text-sm text-gray-500">
                      {question.description}
                    </p>
                  )}

                  <div className="mt-5">
                    {renderPreview(question)}
                  </div>

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function renderPreview(question: any) {
  switch (question.type) {

    case "paragraph":
      return (
        <textarea
          disabled
          placeholder={question.placeholder || "Long answer"}
          className="h-28 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
        />
      );

    case "multiple_choice":
      return (
        <div className="space-y-3">

          <label className="flex items-center gap-3">
            <input type="radio" disabled />
            Option 1
          </label>

          <label className="flex items-center gap-3">
            <input type="radio" disabled />
            Option 2
          </label>

        </div>
      );

    case "checkbox":
      return (
        <div className="space-y-3">

          <label className="flex items-center gap-3">
            <input type="checkbox" disabled />
            Option 1
          </label>

          <label className="flex items-center gap-3">
            <input type="checkbox" disabled />
            Option 2
          </label>

        </div>
      );

    case "dropdown":
      return (
        <select
          disabled
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <option>Select an option</option>
        </select>
      );

    case "rating":
      return (
        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              disabled
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white"
            >
              {n}
            </button>
          ))}

        </div>
      );

    default:
      return (
        <input
          disabled
          placeholder={question.placeholder || "Type your answer"}
          className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
        />
      );
  }
}