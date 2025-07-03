import { API_BASE_URL } from "./env";

export const endpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    refresh: `${API_BASE_URL}/auth/refresh`,
    logout: `${API_BASE_URL}/auth/logout`,
  },
  users: {
    magicLink: `${API_BASE_URL}/users/magic-link`,
    magicLinkCallback: `${API_BASE_URL}/users/magic-link/callback`,
    jwt: `${API_BASE_URL}/users/jwt`,
    logout: `${API_BASE_URL}/users/logout`,
  },
  workspaces: {
    list: (params?: {skip?: number; limit?: number}) => `${API_BASE_URL}/workspaces/?${params?.skip !== undefined ? `skip=${params.skip}&` : ""}${params?.limit !== undefined ? `limit=${params.limit}` : ""}`,
    create: `${API_BASE_URL}/workspaces/`,
    details: (workspaceId: string) => `${API_BASE_URL}/workspaces/${workspaceId}`,
    update: (workspaceId: string) => `${API_BASE_URL}/workspaces/${workspaceId}`,
    delete: (workspaceId: string) => `${API_BASE_URL}/workspaces/${workspaceId}`,
  },
  projects: {
    list: (params?: {skip?: number; limit?: number}) => `${API_BASE_URL}/projects/?${params?.skip !== undefined ? `skip=${params.skip}&` : ""}${params?.limit !== undefined ? `limit=${params.limit}` : ""}`,
    create: `${API_BASE_URL}/projects/`,
    details: (projectId: string) => `${API_BASE_URL}/projects/${projectId}`,
    update: (projectId: string) => `${API_BASE_URL}/projects/${projectId}`,
    delete: (projectId: string) => `${API_BASE_URL}/projects/${projectId}`,
  },
  knowledgeBase: {
    create: `${API_BASE_URL}/knowledge_base/document`,
    update: (docId: string) => `${API_BASE_URL}/knowledge_base/document/${docId}`,
    delete: (docId: string) => `${API_BASE_URL}/knowledge_base/document/${docId}`,
    overview: `${API_BASE_URL}/knowledge_base/documents/overview`,
  },
  messages: {
    list: (params: { agent: string; project_id: string }) => `${API_BASE_URL}/messages/list?agent=${params.agent}&project_id=${params.project_id}`,
  },
} as const;

export type EndpointKey = typeof endpoints;
