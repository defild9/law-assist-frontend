import { LayoutWrapper } from '@/components/chat/LayoutWrapper';
import { ReactNode } from 'react';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from '@tanstack/react-query';
import { ConversationService } from '@/api/services/ConversationService';
import { ModelProvider } from '@/contexts/ModelContext';
import { BotService } from '@/api/services/BotService';

export default async function ChatLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['conversations', { page: 1, limit: 20 }],
      queryFn: () => ConversationService.getConversations(1, 20),
    }),
    queryClient.prefetchQuery({
      queryKey: ['bots'],
      queryFn: () => BotService.getAllBots(),
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ModelProvider>
        <div className="flex h-screen">
          <LayoutWrapper>{children}</LayoutWrapper>
        </div>
      </ModelProvider>
    </HydrationBoundary>
  );
}
