export enum QuestionType {
  SHORT_ANSWER = "short_answer",
  PARAGRAPH = "paragraph",
  MULTIPLE_CHOICE = "multiple_choice",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  RATING = "rating",
  EMAIL = "email",
  PHONE = "phone",
  DATE = "date",
}

export interface QuestionOption {
  id: string;
  questionId: string;
  label: string;
  value: string;
  order: number;
}

export interface Question {
  id: string;
  formId: string;
  title: string;
  description?: string;
  type: QuestionType;
  required: boolean;
  placeholder?: string;
  options?: QuestionOption[];
  order: number;
}

export type FormStatus = "draft" | "published" | "archived";

export interface Form {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: FormStatus;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}