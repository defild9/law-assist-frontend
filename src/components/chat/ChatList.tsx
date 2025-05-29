'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { MessageSquare, Trash2 } from 'lucide-react';
import { isToday, isYesterday, isThisWeek } from 'date-fns';
import { motion } from 'framer-motion';
import type { ConversationPreview } from '@/api/types/conversation';
import { useConversations } from '@/hooks/useConversations';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog';
import { useDeleteConversation } from '@/hooks/useDeleteConversation';
import Link from 'next/link';
import { toast } from 'sonner';

interface ChatListProps {
  activeChat?: string | null;
}

export function ChatList({ activeChat }: ChatListProps) {
  const [chatIdToDelete, setChatIdToDelete] = useState<string | null>(null);

  const { data, isLoading, isError } = useConversations(1, 20);
  const { mutate: deleteConversation } = useDeleteConversation({
    onSuccess: () => {
      toast.success('Чат успішно видалено');
    },
    onError: error => {
      toast.error('Помилка під час видалення чату');
      console.error('Помилка видалення чату:', error);
    },
  });

  if (isLoading) {
    return <div className="flex-1 p-4">Завантаження чатів…</div>;
  }
  if (isError || !data) {
    return <div className="flex-1 p-4">Помилка завантаження чатів.</div>;
  }

  const todayChats = data.conversations.filter(convo => isToday(new Date(convo.updatedAt)));
  const yesterdayChats = data.conversations.filter(convo => isYesterday(new Date(convo.updatedAt)));
  const last7DaysChats = data.conversations.filter(
    convo =>
      isThisWeek(new Date(convo.updatedAt)) &&
      !isToday(new Date(convo.updatedAt)) &&
      !isYesterday(new Date(convo.updatedAt))
  );
  const olderChats = data.conversations.filter(
    convo =>
      !isToday(new Date(convo.updatedAt)) &&
      !isYesterday(new Date(convo.updatedAt)) &&
      !isThisWeek(new Date(convo.updatedAt))
  );

  const renderChats = (conversations: ConversationPreview[]) =>
    conversations.map(conversation => (
      <motion.div
        key={conversation.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`group w-full text-left p-2 rounded-lg transition-colors ${
          activeChat === conversation.id
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-white/10'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/chat/${conversation.id}`}
            prefetch={true}
            className="flex items-center gap-3 text-left flex-1"
          >
            <MessageSquare className="h-5 w-5 shrink-0" />
            <div className="min-w-0">
              <p className="font-medium truncate">{conversation.title}</p>
            </div>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                  activeChat === conversation.id
                    ? 'hover:bg-primary/20 text-primary-foreground'
                    : 'hover:bg-muted-foreground/20'
                }`}
                onClick={e => {
                  setChatIdToDelete(conversation.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Видалити чат</AlertDialogTitle>
                <AlertDialogDescription>
                  Ви впевнені, що хочете видалити цей чат? Цю дію не можна скасувати.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Скасувати</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (chatIdToDelete) {
                      deleteConversation(chatIdToDelete);
                      setChatIdToDelete(null);
                    }
                  }}
                >
                  Видалити
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </motion.div>
    ));

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-6">
      {todayChats.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">Сьогодні</h2>
          {renderChats(todayChats)}
        </div>
      )}

      {yesterdayChats.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">Вчора</h2>
          {renderChats(yesterdayChats)}
        </div>
      )}

      {last7DaysChats.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">Останні 7 днів</h2>
          {renderChats(last7DaysChats)}
        </div>
      )}

      {olderChats.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">Старіші</h2>
          {renderChats(olderChats)}
        </div>
      )}
    </div>
  );
}
