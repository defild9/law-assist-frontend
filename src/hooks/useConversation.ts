import { ConversationService } from '@/api/services/ConversationService';
import { useQuery } from '@tanstack/react-query';

export const useConversation = (id: string) => {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => ConversationService.getConversation(id),
    staleTime: 5 * 60 * 1000,
  });
};
