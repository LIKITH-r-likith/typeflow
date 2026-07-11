import { create } from "zustand";
import { Question, QuestionType } from "@/types/form";

interface BuilderState {
  questions: Question[];
  selectedQuestionId: string | null;
  formTitle: string;
  formDescription: string;
  addQuestion: (type: QuestionType) => void;
  deleteQuestion: (id: string) => void;
  duplicateQuestion: (id: string) => void;
  updateQuestion: (id: string, data: Partial<Question>) => void;
  selectQuestion: (id: string | null) => void;
  moveQuestion: (from: number, to: number) => void;
  setQuestions: (questions: Question[]) => void;
  setFormTitle: (title: string) => void;
  setFormDescription: (description: string) => void;
  clear: () => void;
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  questions: [],
  selectedQuestionId: null,
  formTitle: "Untitled Form",
  formDescription: "",

  addQuestion: (type) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      formId: "",
      title: "Untitled Question",
      description: "",
      type,
      required: false,
      placeholder: "Type your answer...",
      options:
        type === "multiple_choice" || type === "checkbox" || type === "dropdown"
          ? []
          : undefined,
      order: get().questions.length,
    };

    set((state) => ({
      questions: [...state.questions, newQuestion],
      selectedQuestionId: newQuestion.id,
    }));
  },

  deleteQuestion: (id) => {
    set((state) => {
      const filtered = state.questions
        .filter((q) => q.id !== id)
        .map((q, index) => ({ ...q, order: index }));

      return {
        questions: filtered,
        selectedQuestionId:
          state.selectedQuestionId === id ? null : state.selectedQuestionId,
      };
    });
  },

  duplicateQuestion: (id) => {
    set((state) => {
      const original = state.questions.find((q) => q.id === id);
      if (!original) return state;

      const duplicate: Question = {
        ...original,
        id: crypto.randomUUID(),
        title: `${original.title} (Copy)`,
        options: original.options
          ? original.options.map((opt) => ({
              ...opt,
              id: crypto.randomUUID(),
            }))
          : undefined,
        order: original.order + 1,
      };

      const index = state.questions.findIndex((q) => q.id === id);
      const updated = [...state.questions];
      updated.splice(index + 1, 0, duplicate);

      return {
        questions: updated.map((q, i) => ({ ...q, order: i })),
        selectedQuestionId: duplicate.id,
      };
    });
  },

  updateQuestion: (id, data) => {
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...data } : q
      ),
    }));
  },

  selectQuestion: (id) => {
    set({ selectedQuestionId: id });
  },

  moveQuestion: (from, to) => {
    set((state) => {
      const updated = [...state.questions];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);

      return {
        questions: updated.map((q, i) => ({ ...q, order: i })),
      };
    });
  },

  setQuestions: (questions) => {
    set({ questions });
  },

  setFormTitle: (title) => {
    set({ formTitle: title });
  },

  setFormDescription: (description) => {
    set({ formDescription: description });
  },

  clear: () => {
    set({
      questions: [],
      selectedQuestionId: null,
      formTitle: "Untitled Form",
      formDescription: "",
    });
  },
}));