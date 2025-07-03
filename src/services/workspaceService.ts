// src/services/workspaceService.ts
import httpClient from "@/api/httpClient";
import { endpoints } from "@/api/endpoints";

// These interfaces match the OpenAPI spec
export interface WorkspaceCreate {
  name: string;
  user_id: string;
}

export interface WorkspaceUpdate {
  name?: string | null;
}

export interface Workspace {
  id: string;
  name: string;
  user_id: string;
}

// Fetch all workspaces (with optional skip/limit)
export const getAllWorkspaces = async (params?: { skip?: number; limit?: number }): Promise<Workspace[]> => {
  const response = await httpClient.get<Workspace[]>(endpoints.workspaces.list(params));
  return response.data;
};

// Create a new workspace
export const createWorkspace = async (payload: WorkspaceCreate): Promise<Workspace> => {
  const response = await httpClient.post<Workspace>(endpoints.workspaces.create, payload);
  return response.data;
};

// Get a workspace by id
export const getWorkspaceById = async (workspaceId: string): Promise<Workspace> => {
  const response = await httpClient.get<Workspace>(endpoints.workspaces.details(workspaceId));
  return response.data;
};

// Update a workspace by id
export const updateWorkspaceById = async (
  workspaceId: string,
  payload: WorkspaceUpdate
): Promise<Workspace> => {
  const response = await httpClient.put<Workspace>(
    endpoints.workspaces.update(workspaceId),
    payload
  );
  return response.data;
};

// Delete a workspace by id
export const deleteWorkspaceById = async (workspaceId: string): Promise<void> => {
  await httpClient.delete(endpoints.workspaces.delete(workspaceId));
};
