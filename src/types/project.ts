export interface Project {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;      // Assuming a project belongs to a workspace
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed from your API
}