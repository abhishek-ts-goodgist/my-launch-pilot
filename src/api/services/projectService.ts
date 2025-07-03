import httpClient from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';
import type { Project } from '@/types/project';

export const getProjects = async (): Promise<Project[]> => {
  const response = await httpClient.get(endpoints.projects.list());
  return response.data;
};

// More project-related API calls (e.g., create, update, delete) can go here