import httpClient from "@/api/httpClient";
import { endpoints } from "@/api/endpoints";

export interface Message {
  _id: string;
  created_at: string;
  updated_at: string;
  agent: string;
  project_id: string;
  role: "user" | "assistant";
  content: string;
}

export const getMessages = async (params: { agent: string; project_id: string }): Promise<Message[]> => {
  const response = await httpClient.get<Message[]>(endpoints.messages.list(params));
  return response.data;
};
