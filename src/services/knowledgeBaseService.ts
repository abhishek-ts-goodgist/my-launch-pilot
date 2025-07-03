// src/services/knowledgeBaseService.ts
import httpClient from "@/api/httpClient";
import { endpoints } from "@/api/endpoints";

export interface MeiliSearchDocument {
  id?: string | number | null;
  title?: string | null;
  content?: string | null;
  tags?: string[] | null;
}

export const createKnowledgeDoc = async (payload: MeiliSearchDocument) => {
  const res = await httpClient.post(endpoints.knowledgeBase.create, payload);
  return res.data;
};

export const updateKnowledgeDoc = async (docId: string, payload: MeiliSearchDocument) => {
  const res = await httpClient.put(endpoints.knowledgeBase.update(docId), payload);
  return res.data;
};

export const deleteKnowledgeDoc = async (docId: string) => {
  const res = await httpClient.delete(endpoints.knowledgeBase.delete(docId));
  return res.data;
};

export const listKnowledgeOverview = async () => {
  const res = await httpClient.get(endpoints.knowledgeBase.overview);
  return res.data;
};
