import { useEffect } from 'react';
import { useMessageStore } from '@/stores/messageStore';

export const useMessage = (params: { agent: string; project_id: string }) => {
  const { messages, fetchMessages, isLoading, error } = useMessageStore();

  useEffect(() => {
    if(params.agent && params.project_id) {
      fetchMessages(params);
    }
  }, [params.agent, params.project_id, fetchMessages]);

  return { messages, isLoading, error };
};