'use client';

import React, { useState } from 'react';
import { UserIcon, Copy, ThumbsUp, ThumbsDown, FileText, Download } from 'lucide-react';
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
import { ChatMessage } from '@/api/types/conversation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [showImageDialog, setShowImageDialog] = useState<string | null>(null);

  const markdownRegex = /[#*_`>-]/;

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

  const handleDownload = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
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

  const handleDownloadDocx = async () => {
    const [{ default: MarkdownIt }, { default: htmlDocx }] = await Promise.all([
      import('markdown-it'),
      import('html-docx-js/dist/html-docx'),
    ]);
    const md = new MarkdownIt();
    const html = `<html><head><meta charset="utf-8"></head><body>${md.render(
      message.content
    )}</body></html>`;
    const blob = htmlDocx.asBlob(html);
    const url = URL.createObjectURL(blob);
    handleDownload(url, `message-${message.id}.docx`);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message.content,
          messageId: message.id,
        }),
      });

      if (!response.ok) {
        toast.error('Помилка при генерації PDF');
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `message-${message.id}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error('Не вдалося згенерувати PDF');
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
            'p-3 rounded-lg max-w-[90vw] break-words',
            isUser
              ? 'order-1 bg-primary text-primary-foreground rounded-tr-none'
              : 'bg-muted rounded-tl-none'
          )}
        >
          {markdownRegex.test(message.content) ? (
            <div className="prose prose-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
          {message.files && message.files.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.files.map((file, index) =>
                file.type === 'image_url' ? (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    <img
                      src={file.image_url.url}
                      alt={`attachment-${index}`}
                      className="w-full h-auto max-h-[300px] object-contain cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setShowImageDialog(file.image_url.url)}
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                      onClick={() => handleDownload(file.image_url.url, `image-${index}.png`)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-lg',
                      isUser ? 'bg-primary-foreground/10' : 'bg-background'
                    )}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium flex-1 truncate">
                      {decodeURIComponent(escape(file.file.filename))}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDownload(file.file.file_data, file.file.filename)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
            </div>
          )}
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
            {markdownRegex.test(message.content) && (
              <>
                <Button variant="ghost" size="icon" onClick={handleDownloadDocx}>
                  <FileText className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownloadPdf}>
                  <Download className="h-3 w-3" />
                </Button>
              </>
            )}
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
            <DialogTitle>Інший відгук</DialogTitle>
            <DialogDescription>Розкажіть нам більше...</DialogDescription>
          </DialogHeader>
          <Textarea
            value={otherFeedback}
            onChange={e => setOtherFeedback(e.target.value)}
            placeholder="Ваш коментар"
            className="w-full min-h-[100px]"
          />
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Скасувати</Button>
            </DialogClose>
            <Button onClick={handleOtherSubmit} disabled={!otherFeedback.trim()}>
              Надіслати
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageItem;
