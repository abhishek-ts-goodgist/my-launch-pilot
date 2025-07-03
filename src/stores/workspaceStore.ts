import { create } from 'zustand';
import type { Workspace } from '@/types/workspace';
import { getWorkspaces } from '@/api/services/workspaceService';

type WorkspaceState = {
  workspaces: Workspace[];
  isLoading: boolean;
  error: string | null;
  fetchWorkspaces: () => Promise<void>;
};

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  isLoading: false,
  error: null,

  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const workspaces = await getWorkspaces();
      set({ workspaces, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch workspaces', isLoading: false });
    }
  },
}));