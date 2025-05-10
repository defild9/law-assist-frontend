import { LayoutWrapper } from '@/components/chat/LayoutWrapper';
import { ReactNode } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { ConversationService } from '@/api/services/ConversationService';

export default async function ChatLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['conversations', { page: 1, limit: 20 }],
    queryFn: () => ConversationService.getConversations(1, 20),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
      </div>
    </HydrationBoundary>
  );
}
