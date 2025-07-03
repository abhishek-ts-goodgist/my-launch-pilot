import { useEffect } from 'react';
import { useKnowledgeBaseStore } from '@/stores/knowledgeBaseStore';

export const useKnowledgeBase = () => {
  const { documents, fetchKnowledgeBaseDocs, isLoading, error } = useKnowledgeBaseStore();

  useEffect(() => {
    fetchKnowledgeBaseDocs();
  }, [fetchKnowledgeBaseDocs]);

  return { documents, isLoading, error };
};