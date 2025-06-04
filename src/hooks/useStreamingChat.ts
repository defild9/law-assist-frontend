'use client';
import { useState, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useModel } from '@/contexts/ModelContext';
import { ChatMessage, FilePartItem } from '@/api/types/conversation';

export function useStreamingChat(initialChatId?: string, initialMessages: ChatMessage[] = []) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { model } = useModel();

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [chatId, setChatId] = useState<string | null>(initialChatId || null);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement>(null);

  // Update URL and refresh chat list
  useEffect(() => {
    if (chatId) {
      if (typeof window !== 'undefined') {
        window.history.replaceState({}, '', `/chat/${chatId}`);
      }
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    }
  }, [chatId, queryClient]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setChatId(null);
    setIsTyping(false);
  };

  const sendMessage = async (prompt: string, files: File[] = []) => {
    if (!session?.accessToken) return;

    // Show "bot is typing" indicator
    setIsTyping(true);

    // Add user's message
    const userMsgId = `u-${Date.now()}`;
    const userFilePreviews: FilePartItem[] = await Promise.all(
      files.map(async file => {
        const base64 = await fileToDataUrl(file);
        return file.type.startsWith('image/')
          ? { type: 'image_url', image_url: { url: base64 } }
          : { type: 'file', file: { file_data: base64, filename: file.name } };
      })
    );

    setMessages(prev => [
      ...prev,
      { id: userMsgId, role: 'user', content: prompt, files: userFilePreviews },
    ]);

    const botMsgId = `b-${Date.now()}`;
    setMessages(prev => [...prev, { id: botMsgId, role: 'assistant', content: '' }]);

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      if (chatId) formData.append('chatId', chatId);
      if (model) formData.append('model', model);
      files.forEach(file => formData.append('files', file));

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversation`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantIndex = -1;
      let firstChunk = true;

      // Find assistant's message index in array
      setMessages(prev => {
        assistantIndex = prev.findIndex(m => m.id === botMsgId);
        return prev;
      });

      // Read SSE stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Stop "typing" indicator after receiving the first chunk
        if (firstChunk) {
          setIsTyping(false);
          firstChunk = false;
        }

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');

        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i].trim();
          if (!part.startsWith('data:')) continue;

          const json = part.replace(/^data:\s*/, '');
          try {
            const parsed = JSON.parse(json);
            if (parsed.chatId) setChatId(parsed.chatId);

            if (parsed.content) {
              setMessages(prev => {
                const msgs = [...prev];
                const existing = msgs[assistantIndex].content;
                const addition = parsed.content;
                const needsSpace = /^[0-9]/.test(addition) && /[A-Za-zА-Яа-я0-9]$/.test(existing);
                msgs[assistantIndex] = {
                  ...msgs[assistantIndex],
                  content: existing + (needsSpace ? ' ' : '') + addition,
                };
                return msgs;
              });
            }
          } catch {
            // Ignore invalid JSON
          }
        }

        buffer = parts[parts.length - 1];
      }
    } catch (err: any) {
      // On error — stop typing indicator and show error message
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { id: `e-${Date.now()}`, role: 'assistant', content: `Error: ${err.message}` },
      ]);
    }
  };

  return { messages, sendMessage, endRef, clearChat, isTyping };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
