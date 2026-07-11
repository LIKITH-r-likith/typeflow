"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Type,
  AlignLeft,
  CircleDot,
  CheckSquare,
  ChevronDownSquare,
  Star,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

import { QuestionType } from "@/types/form";
import { useBuilderStore } from "@/store/builder-store";

const questionTypes: {
  label: string;
  type: QuestionType;
  icon: typeof Type;
}[] = [
  {
    label: "Short Answer",
    type: QuestionType.SHORT_ANSWER,
    icon: Type,
  },
  {
    label: "Paragraph",
    type: QuestionType.PARAGRAPH,
    icon: AlignLeft,
  },
  {
    label: "Multiple Choice",
    type: QuestionType.MULTIPLE_CHOICE,
    icon: CircleDot,
  },
  {
    label: "Checkbox",
    type: QuestionType.CHECKBOX,
    icon: CheckSquare,
  },
  {
    label: "Dropdown",
    type: QuestionType.DROPDOWN,
    icon: ChevronDownSquare,
  },
  {
    label: "Rating",
    type: QuestionType.RATING,
    icon: Star,
  },
  {
    label: "Date",
    type: QuestionType.DATE,
    icon: Calendar,
  },
  {
    label: "Email",
    type: QuestionType.EMAIL,
    icon: Mail,
  },
  {
    label: "Phone",
    type: QuestionType.PHONE,
    icon: Phone,
  },
];

export function BuilderSidebar() {
  const addQuestion = useBuilderStore((state) => state.addQuestion);

  return (
    <aside className="hidden lg:flex h-screen w-80 shrink-0 flex-col border-r border-white/40 bg-white/65 backdrop-blur-3xl">

      {/* Header */}

      <div className="border-b border-gray-100 px-6 py-6">

        <button
          onClick={() => addQuestion(QuestionType.SHORT_ANSWER)}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-indigo-600
            px-5
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-violet-500/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-xl
            hover:shadow-violet-500/30
          "
        >
          <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
          Add Question
        </button>

      </div>

      {/* Question Types */}

      <div className="flex-1 overflow-y-auto px-5 py-6">

        <h3 className="mb-5 px-2 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
          Question Types
        </h3>

        <div className="space-y-2">

          {questionTypes.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
    whileHover={{
      x: 4,
      scale: 1.02,
    }}
    whileTap={{
      scale: 0.97,
    }}
                key={item.label}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.04,
                }}
                onClick={() => addQuestion(item.type)}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-transparent
                  bg-white/70
                  px-4
                  py-3.5
                  text-left
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-violet-200
                  hover:bg-white
                  hover:shadow-lg
                  hover:shadow-violet-500/10
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-gradient-to-br
                    from-violet-100
                    to-fuchsia-100
                    text-violet-600
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:rotate-3
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex flex-col">

                  <span className="text-sm font-semibold text-gray-800">
                    {item.label}
                  </span>

                  <span className="text-xs text-gray-400">
                    Click to add
                  </span>

                </div>
              </motion.button>
            );
          })}

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-gray-100 p-5">

        <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-[1px]">

          <div className="rounded-2xl bg-white px-5 py-4">

            <p className="text-sm font-semibold text-gray-900">
              🚀 Pro Builder
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Drag, reorder and customize every question with a beautiful
              Typeform-inspired experience.
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}