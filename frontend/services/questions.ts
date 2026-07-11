import { api } from "@/lib/api";

export interface QuestionCreatePayload {
  form_id: number;
  title: string;
  description?: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  order?: number;
}

export interface QuestionUpdatePayload {
  title?: string;
  description?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  order?: number;
}

export interface QuestionApiResponse {
  id: number;
  form_id: number;
  title: string;
  description: string | null;
  type: string;
  required: boolean;
  placeholder: string | null;
  order: number;
}

export async function createQuestion(
  data: QuestionCreatePayload
): Promise<QuestionApiResponse> {
  const response = await api.post<QuestionApiResponse>("/questions", data);
  return response.data;
}

export async function getQuestionsByForm(
  formId: number
): Promise<QuestionApiResponse[]> {
  const response = await api.get<QuestionApiResponse[]>(
    `/forms/${formId}/questions`
  );
  return response.data;
}

export async function getQuestion(
  questionId: number
): Promise<QuestionApiResponse> {
  const response = await api.get<QuestionApiResponse>(
    `/questions/${questionId}`
  );
  return response.data;
}

export async function updateQuestion(
  questionId: number,
  data: QuestionUpdatePayload
): Promise<QuestionApiResponse> {
  const response = await api.put<QuestionApiResponse>(
    `/questions/${questionId}`,
    data
  );
  return response.data;
}

export async function deleteQuestion(questionId: number): Promise<void> {
  await api.delete(`/questions/${questionId}`);
}