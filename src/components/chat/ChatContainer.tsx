'use client';
import React, { useEffect } from 'react';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { AnimatePresence, motion } from 'framer-motion';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
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
  }, [pathName, isEmptyChat, clearChat]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background">
      <div className="flex-1 relative">
        <AnimatePresence>
          {isEmptyChat ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="max-w-md w-full px-6">
                <h1 className="text-2xl font-bold text-center mb-6">Chat with AI Lawyer</h1>
                <p className="text-muted-foreground text-center mb-8">
                  Ask me anything and I&apos;ll do my best to help you. Start by typing a message
                  below.
                </p>
                <MessageInput onSendMessage={sendMessage} autoFocus />
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="h-full overflow-y-auto pt-16 pb-24 scroll-smooth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <MessageList messages={messages} isTyping={isTyping} />
              <div ref={endRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isEmptyChat && (
        <motion.div
          className="w-full py-4 px-4 absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-4xl mx-auto">
            <MessageInput onSendMessage={sendMessage} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatContainer;
