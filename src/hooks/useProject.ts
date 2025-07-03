import { useEffect } from 'react';
import { useProjectStore } from '@/stores/projectStore';

export const useProject = () => {
  const { projects, fetchProjects, isLoading, error } = useProjectStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, isLoading, error };
};