import httpClient from '@/api/httpClient';
import { endpoints } from '@/api/endpoints';
import type { Workspace } from '@/types/workspace';

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const response = await httpClient.get(endpoints.workspaces.list());
  return response.data;
};

// Add more workspace-related API calls here (create, update, delete) as needed