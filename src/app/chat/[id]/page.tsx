'use client';

import React, { use } from 'react';
import ChatContainer from '@/components/chat/ChatContainer';
import { useConversation } from '@/hooks/useConversation';
import { ChatMessage } from '@/hooks/useStreamingChat';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = use(params);

  const { data: conversation, isLoading, error } = useConversation(id);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {String(error)}</div>;
  }

  const rawMessages = conversation?.messages ?? [];
  const initialMessages: ChatMessage[] = rawMessages.map(m => ({
    id: m.id,
    role: m.role,
    content: m.content,
  }));

  return <ChatContainer initialChatId={id} initialMessages={initialMessages} />;
}
