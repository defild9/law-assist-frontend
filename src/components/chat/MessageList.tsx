import React from 'react';
import { ChatMessage } from '@/hooks/useStreamingChat';
import MessageItem from './MessageItem';
import { motion } from 'framer-motion';
import { LoadingDots } from '../ui/LoadingDots';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <div className="space-y-4 px-4">
      {messages.map(message => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MessageItem message={message} />
        </motion.div>
      ))}
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start gap-2"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs text-primary-foreground">AI</span>
          </div>
          <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
            <LoadingDots />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MessageList;
