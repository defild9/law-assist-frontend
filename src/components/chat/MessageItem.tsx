'use client';

import React, { useState } from 'react';
import { UserIcon, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ChatMessage } from '@/hooks/useStreamingChat';
import { cn } from '@/libs/utils';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import { useCreateFeedback, useUpdateFeedback } from '@/hooks/useFeedback';
import { FeedbackTag, FeedbackType } from '@/api/types/feedback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../ui/Dialog';
import { Textarea } from '../ui/TextArea';

interface MessageItemProps {
  message: ChatMessage;
}

const tags = [
  FeedbackTag.TOO_SHORT,
  FeedbackTag.OFF_TOPIC,
  FeedbackTag.HELPFUL,
  FeedbackTag.HARMFUL,
  FeedbackTag.SPAM,
  FeedbackTag.OTHER,
];

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const [fbId, setFbId] = useState<string | null>(null);
  const [fbType, setFbType] = useState<FeedbackType | null>(null);
  const [, setFbTag] = useState<FeedbackTag | null>(null);
  const [showTags, setShowTags] = useState(false);
  const [showOtherDialog, setShowOtherDialog] = useState(false);
  const [otherFeedback, setOtherFeedback] = useState('');

  const createFeedback = useCreateFeedback({
    onSuccess: data => {
      setFbId(data.id);
      toast.success('Feedback saved');
    },
    onError: () => toast.error('Failed to save feedback'),
  });

  const updateFeedback = useUpdateFeedback({
    onSuccess: () => toast.success('Feedback updated'),
    onError: () => toast.error('Failed to update feedback'),
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Copy failed');
    }
  };

  const handleLike = () => {
    setFbType(FeedbackType.LIKE);
    setFbTag(null);
    createFeedback.mutate({
      message: message.id,
      type: FeedbackType.LIKE,
    });
  };

  const handleDislike = () => {
    setFbType(FeedbackType.DISLIKE);
    setFbTag(null);
  };

  const handleTagSelect = (tag: FeedbackTag) => {
    setFbTag(tag);
    const payload = { type: FeedbackType.DISLIKE as const, tag };
    const onDone = () => {
      // hide the tags panel
      setFbType(null);
      setFbTag(null);
    };
    if (tag === FeedbackTag.OTHER) {
      setOtherFeedback('');
      setShowOtherDialog(true);
      return;
    }
    if (fbId) {
      updateFeedback.mutate({ id: fbId, data: payload }, { onSuccess: onDone });
    } else {
      createFeedback.mutate({ message: message.id, ...payload }, { onSuccess: onDone });
    }
  };

  const handleOtherSubmit = () => {
    if (!otherFeedback.trim()) return;
    const payload = {
      type: FeedbackType.DISLIKE as const,
      tag: FeedbackTag.OTHER,
      comment: otherFeedback,
    };
    const onDone = () => {
      setShowOtherDialog(false);
      setFbType(null);
      setFbTag(null);
    };
    if (fbId) {
      updateFeedback.mutate({ id: fbId, data: payload }, { onSuccess: onDone });
    } else {
      createFeedback.mutate({ message: message.id, ...payload }, { onSuccess: onDone });
    }
  };

  return (
    <div className={cn('group flex flex-col gap-2', isUser && 'items-end')}>
      {/* bubble */}
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

      {/* actions */}
      <div
        className={cn(
          'flex gap-1 px-10 opacity-0 group-hover:opacity-100 transition-opacity',
          isUser && 'justify-end'
        )}
      >
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          <Copy className="h-3 w-3" />
        </Button>
        {!isUser && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(fbType === FeedbackType.LIKE && 'text-green-500')}
              onClick={handleLike}
            >
              <ThumbsUp className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(fbType === FeedbackType.DISLIKE && 'text-red-500')}
              onClick={handleDislike}
            >
              <ThumbsDown className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>

      {fbType === FeedbackType.DISLIKE && (
        <div className={cn('flex flex-wrap gap-2 px-10', isUser && 'justify-end')}>
          {tags.map(tag => (
            <Button key={tag} variant="outline" size="sm" onClick={() => handleTagSelect(tag)}>
              {tag}
            </Button>
          ))}
        </div>
      )}

      {/* custom tag dialog */}
      <Dialog open={showOtherDialog} onOpenChange={setShowOtherDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Other Feedback</DialogTitle>
            <DialogDescription>Tell us more...</DialogDescription>
          </DialogHeader>
          <Textarea
            value={otherFeedback}
            onChange={e => setOtherFeedback(e.target.value)}
            placeholder="Your comment"
            className="w-full min-h-[100px]"
          />
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleOtherSubmit} disabled={!otherFeedback.trim()}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageItem;
