'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useSearchConversations } from '@/hooks/useSearchConversations';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/Command';
import { MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectChat: (chatId: string) => void;
}

export function SearchConversationsDialog({ open, onOpenChange, onSelectChat }: SearchDialogProps) {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue.trim() || '');
    }, 300);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const {
    data,
    isLoading: isInitialLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSearchConversations(search, 10);

  const allChats = useMemo(() => data?.pages.flatMap(page => page.conversations) ?? [], [data]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;
    const obs = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { rootMargin: '200px' }
    );
    obs.observe(loadMoreRef.current);
    return () => obs.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search chats..."
        value={inputValue}
        onValueChange={setInputValue}
        autoFocus
      />
      <CommandList>
        {isInitialLoading && <CommandItem disabled>Loading…</CommandItem>}

        {!isInitialLoading && allChats.length > 0 && (
          <CommandGroup heading="Chats">
            {allChats.map(chat => {
              const lastMsg =
                chat.lastMessage?.content ?? chat.messages_details?.slice(-1)[0]?.content ?? '';

              const firstMsg = chat.messages_details?.[0]?.content ?? 'Untitled';
              const title = chat.title !== 'New Chat' ? chat.title : firstMsg.slice(0, 30) + '…';

              const date = chat.updatedAt ?? chat.createdAt;

              return (
                <CommandItem
                  key={chat.id}
                  value={title} // <— allow cmdk to match/filter this item
                  onSelect={() => onSelectChat(chat.id)}
                  className="flex items-center gap-2 py-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate">{title}</p>
                    {lastMsg && <p className="text-sm text-muted-foreground truncate">{lastMsg}</p>}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {date ? format(new Date(date), 'HH:mm') : ''}
                  </span>
                </CommandItem>
              );
            })}

            {hasNextPage && <div ref={loadMoreRef} style={{ height: 1 }} />}
            {isFetchingNextPage && <CommandItem disabled>Loading more…</CommandItem>}
            {!hasNextPage && <CommandItem disabled>End of results</CommandItem>}
          </CommandGroup>
        )}

        {!isInitialLoading && allChats.length === 0 && <CommandEmpty>No chats found.</CommandEmpty>}
      </CommandList>
    </CommandDialog>
  );
}
