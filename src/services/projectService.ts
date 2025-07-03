import httpClient from "@/api/httpClient";
import { endpoints } from "@/api/endpoints";

export interface ProjectCreate {
  name: string;
  workspace_id: string;
  project_details?: Record<string, any> | null;
}

export interface ProjectUpdate {
  name?: string | null;
  project_details?: Record<string, any> | null;
}

export interface ProjectInDB {
  id: string;
  name: string;
  workspace_id: string;
  project_details?: Record<string, any> | null;
}

// Create a new project
export const createProject = async (payload: ProjectCreate): Promise<ProjectInDB> => {
  const response = await httpClient.post<ProjectInDB>(endpoints.projects.create, payload);
  return response.data;
};

// List all projects (with optional skip/limit)
export const listProjects = async (params?: { skip?: number; limit?: number }): Promise<ProjectInDB[]> => {
  const response = await httpClient.get<ProjectInDB[]>(endpoints.projects.list(params));
  return response.data;
};

// Get a project by id
export const getProjectById = async (projectId: string): Promise<ProjectInDB> => {
  const response = await httpClient.get<ProjectInDB>(endpoints.projects.details(projectId));
  return response.data;
};

// Update a project by id
export const updateProjectById = async (projectId: string, payload: ProjectUpdate): Promise<ProjectInDB> => {
  const response = await httpClient.put<ProjectInDB>(endpoints.projects.update(projectId), payload);
  return response.data;
};

// Delete a project by id
export const deleteProjectById = async (projectId: string): Promise<void> => {
  await httpClient.delete(endpoints.projects.delete(projectId));
};
