export interface Message {
  _id: string;
  created_at: string;
  updated_at: string;
  agent: string;
  project_id: string;
  role: "user" | "assistant";
  content: string;
}