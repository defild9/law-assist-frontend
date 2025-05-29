'use client';
import React from 'react';
import { PlusIcon, Scale } from 'lucide-react';
import { Button } from '../ui/Button';
import { ChatList } from './ChatList';
import { useRouter } from 'next/navigation';

const ChatSidebar: React.FC = () => {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <Button
          className="w-full gap-2 bg-white text-black"
          onClick={() => router.replace('/chat')}
        >
          <PlusIcon className="h-4 w-4" />
          Новий чат
        </Button>
      </div>

      <ChatList />

      <div className="p-4 border-t mt-auto">
        <Button className="w-full gap-2" onClick={() => router.push('/video-consultation/book')}>
          <Scale className="h-4 w-4" />
          Записатися на консультацію
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;
