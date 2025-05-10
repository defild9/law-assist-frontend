'use client';

import React from 'react';
import { UserIcon, Copy } from 'lucide-react';
import { ChatMessage } from '@/hooks/useStreamingChat';
import { cn } from '@/libs/utils';
import { Button } from '../ui/Button';

interface MessageItemProps {
  message: ChatMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };
  return (
    <div className={cn('group flex flex-col gap-2', isUser && 'items-end')}>
      <div className="flex items-start gap-2">
        <div
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
            isUser ? 'order-2 bg-primary' : 'bg-primary/10'
          )}
        >
          {isUser ? (
            <UserIcon className="h-4 w-4 text-primary-foreground" />
          ) : (
            <span className="text-xs font-medium">AI</span>
          )}
        </div>
        <div
          className={cn(
            'p-3 rounded-lg',
            isUser
              ? 'order-1 bg-primary text-primary-foreground rounded-tr-none'
              : 'bg-muted rounded-tl-none'
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
      <div
        className={cn(
          'flex gap-1 px-10 opacity-0 group-hover:opacity-100 transition-opacity',
          isUser && 'justify-end'
        )}
      >
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default MessageItem;
