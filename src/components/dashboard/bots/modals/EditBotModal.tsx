'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import { Bot } from '@/api/types/bots';
import { VectorStoreCollectionsResponse } from '@/api/types/vectore-store-collection';

interface EditBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBot: Bot | null;
  setSelectedBot: React.Dispatch<React.SetStateAction<Bot | null>>;
  collections?: VectorStoreCollectionsResponse;
  onUpdate: () => void;
  isUpdating: boolean;
}

export default function EditBotModal({
  isOpen,
  onClose,
  selectedBot,
  setSelectedBot,
  collections,
  onUpdate,
  isUpdating,
}: EditBotModalProps) {
  if (!selectedBot) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setSelectedBot(null);
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Bot</DialogTitle>
          <DialogDescription>Update the bot’s information and settings</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>Name</label>
            <Input
              value={selectedBot.name}
              onChange={e =>
                setSelectedBot(prev => (prev ? { ...prev, name: e.target.value } : null))
              }
            />
          </div>
          <div>
            <label>Description</label>
            <Textarea
              value={selectedBot.description || ''}
              onChange={e =>
                setSelectedBot(prev => (prev ? { ...prev, description: e.target.value } : null))
              }
            />
          </div>
          <div>
            <label>Bot Prompt</label>
            <Textarea
              value={selectedBot.botPrompt}
              onChange={e =>
                setSelectedBot(prev => (prev ? { ...prev, botPrompt: e.target.value } : null))
              }
            />
          </div>
          <div>
            <label>Collection</label>
            <Select
              value={selectedBot.chromaCollection}
              onValueChange={val =>
                setSelectedBot(prev => (prev ? { ...prev, chromaCollection: val } : null))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {collections?.collection.map(col => (
                  <SelectItem key={col} value={col}>
                    {col}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedBot(null);
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={onUpdate}>
            {isUpdating ? <Loader2 className="animate-spin h-4 w-4" /> : 'Update Bot'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
