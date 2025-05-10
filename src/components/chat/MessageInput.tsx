'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { SendIcon } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  autoFocus?: boolean;
}
import React from 'react';

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, autoFocus = false }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto resize textarea based on content
  const handleInput = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 bg-muted/30 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-opacity-50 transition-all"
    >
      <textarea
        ref={inputRef}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Type a message..."
        className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none max-h-[200px] min-h-[40px] py-2 px-3 text-base"
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        className="h-10 w-10 rounded-full shrink-0"
        disabled={!message.trim()}
      >
        <SendIcon className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default MessageInput;
