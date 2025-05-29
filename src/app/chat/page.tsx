import ChatContainer from '@/components/chat/ChatContainer';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Чат | Law Assist',
};

export default function ChatPage() {
  return <ChatContainer />;
}
