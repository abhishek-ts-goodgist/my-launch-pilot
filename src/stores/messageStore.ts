import { create } from 'zustand';
import type { Message } from '@/types/message';
import { getMessages } from '@/services/messageService';

type MessageState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  fetchMessages: (params: { agent: string; project_id: string }) => Promise<void>;
};

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,

  fetchMessages: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await getMessages(params);
      set({ messages, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch messages', isLoading: false });
    }
  },
}));