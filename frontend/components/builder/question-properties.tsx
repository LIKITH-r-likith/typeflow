"use client";

import { Settings2 } from "lucide-react";
import { useBuilderStore } from "@/store/builder-store";

export function QuestionProperties() {
  const questions = useBuilderStore((state) => state.questions);
  const selectedQuestionId = useBuilderStore((state) => state.selectedQuestionId);
  const updateQuestion = useBuilderStore((state) => state.updateQuestion);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);

  if (!selectedQuestion) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6">
        <div className="flex items-center gap-2 mb-2">
          <Settings2 className="h-4 w-4 text-indigo-600" />
          <h2 className="text-sm font-semibold text-gray-900">Question Properties</h2>
        </div>
        <p className="text-sm text-gray-400">Select a question to edit its properties.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="flex items-center gap-2 mb-5">
        <Settings2 className="h-4 w-4 text-indigo-600" />
        <h2 className="text-sm font-semibold text-gray-900">Question Properties</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Question Label</label>
          <input
            value={selectedQuestion.title}
            onChange={(e) =>
              updateQuestion(selectedQuestion.id, { title: e.target.value })
            }
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Placeholder</label>
          <input
            value={selectedQuestion.placeholder ?? ""}
            onChange={(e) =>
              updateQuestion(selectedQuestion.id, { placeholder: e.target.value })
            }
            placeholder="Type your placeholder"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Required</label>
          <div className="flex items-center h-9">
            <button
              onClick={() =>
                updateQuestion(selectedQuestion.id, { required: !selectedQuestion.required })
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                selectedQuestion.required ? "bg-indigo-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  selectedQuestion.required ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}