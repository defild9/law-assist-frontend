import { ConversationService } from '@/api/services/ConversationService';
import { Conversations } from '@/api/types/conversation';
import { useQuery } from '@tanstack/react-query';

export const useConversations = (page?: number, limit?: number) => {
  return useQuery<Conversations>({
    queryKey: ['conversations', page, limit],
    queryFn: () => ConversationService.getConversations(page, limit),
    staleTime: 5 * 60 * 1000,
  });
};
