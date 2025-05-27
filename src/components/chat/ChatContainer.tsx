'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { usePathname } from 'next/navigation';
import { ChatMessage } from '@/api/types/conversation';

interface ChatContainerProps {
  initialChatId?: string;
  initialMessages?: ChatMessage[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ initialChatId, initialMessages }) => {
  const pathName = usePathname();
  const { messages, sendMessage, endRef, clearChat, isTyping } = useStreamingChat(
    initialChatId,
    initialMessages
  );
  const isEmptyChat = messages.length === 0;

  useEffect(() => {
    if (!isEmptyChat && pathName === '/chat') {
      clearChat();
    }
  }, [pathName]);

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <AnimatePresence>
        {isEmptyChat ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-w-md w-full text-center">
              <h1 className="text-2xl font-bold mb-4">Chat with AI Lawyer</h1>
              <p className="text-muted-foreground mb-6">
                Ask me anything and I’ll do my best to help you.
              </p>
              <MessageInput onSendMessage={sendMessage} autoFocus />
            </div>
          </motion.div>
        ) : (
          <>
            <motion.div
              className="flex-1 overflow-y-auto pt-16 pb-24 scroll-smooth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MessageList messages={messages} isTyping={isTyping} />
              <div ref={endRef} />
            </motion.div>
            <motion.div
              className="sticky bottom-0 w-full backdrop-blur-sm py-4 px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-4xl mx-auto">
                <MessageInput onSendMessage={sendMessage} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatContainer;
