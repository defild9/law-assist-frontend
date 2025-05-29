'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ConversationService } from '@/api/services/ConversationService';
import { Conversations } from '@/api/types/conversation';

export const useSearchConversations = (query: string, limit = 10) => {
  return useInfiniteQuery<Conversations, Error>({
    queryKey: ['searchConversations', query],
    queryFn: ({ pageParam = 1 }) =>
      ConversationService.searchConversations(query, Number(pageParam), limit),
    enabled: Boolean(query),
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    getPreviousPageParam: firstPage => (firstPage.page > 1 ? firstPage.page - 1 : undefined),
  });
};
