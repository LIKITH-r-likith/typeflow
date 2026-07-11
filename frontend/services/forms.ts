import { api } from "@/lib/api";

export interface FormPayload {
  title: string;
  description?: string;
  status?: string;
}

export interface FormCreatePayload extends FormPayload {
  user_id: number;
}

export interface FormUpdatePayload {
  title?: string;
  description?: string;
  status?: string;
}

export interface FormApiResponse {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export async function createForm(data: FormCreatePayload): Promise<FormApiResponse> {
  const response = await api.post<FormApiResponse>("/forms", data);
  return response.data;
}

export async function getForms(skip = 0, limit = 100): Promise<FormApiResponse[]> {
  const response = await api.get<FormApiResponse[]>("/forms", {
    params: { skip, limit },
  });
  return response.data;
}

export async function getForm(id: number): Promise<FormApiResponse> {
  const response = await api.get<FormApiResponse>(`/forms/${id}`);
  return response.data;
}

export async function updateForm(
  id: number,
  data: FormUpdatePayload
): Promise<FormApiResponse> {
  const response = await api.put<FormApiResponse>(`/forms/${id}`, data);
  return response.data;
}

export async function deleteForm(id: number): Promise<void> {
  await api.delete(`/forms/${id}`);
}