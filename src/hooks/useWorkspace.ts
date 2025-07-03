import { useEffect } from 'react';
import { useWorkspaceStore } from '@/stores/workspaceStore';

export const useWorkspace = () => {
  const { workspaces, fetchWorkspaces, isLoading, error } = useWorkspaceStore();

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return { workspaces, isLoading, error };
};