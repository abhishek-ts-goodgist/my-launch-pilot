import { create } from 'zustand';
import type { KnowledgeBaseDoc } from '@/types/knowledgeBase';
import { listKnowledgeOverview } from '@/services/knowledgeBaseService';

type KnowledgeBaseState = {
  documents: KnowledgeBaseDoc[];
  isLoading: boolean;
  error: string | null;
  fetchKnowledgeBaseDocs: () => Promise<void>;
};

export const useKnowledgeBaseStore = create<KnowledgeBaseState>((set) => ({
  documents: [],
  isLoading: false,
  error: null,

  fetchKnowledgeBaseDocs: async () => {
    set({ isLoading: true, error: null });
    try {
      const docs = await listKnowledgeOverview();
      set({ documents: docs, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch documents', isLoading: false });
    }
  },
}));