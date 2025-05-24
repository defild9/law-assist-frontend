'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Paperclip, SendIcon, X } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string, files: File[]) => void;
  autoFocus?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, autoFocus = false }) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInput = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selected]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || files.length) {
      onSendMessage(message, files);
      setMessage('');
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-muted/30 border rounded-lg p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-opacity-50 transition-all"
    >
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 bg-background rounded-full px-3 py-1 text-sm"
            >
              <span className="truncate max-w-[200px]">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full"
                onClick={() => handleRemoveFile(idx)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
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
          disabled={!message.trim() && files.length === 0}
        >
          <SendIcon className="h-5 w-5" />
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept=".jpeg', .png,application/pdf"
          onChange={handleFileChange}
        />
      </div>
    </form>
  );
};

export default MessageInput;
