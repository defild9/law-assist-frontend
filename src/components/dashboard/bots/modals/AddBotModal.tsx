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
import { VectorStoreCollectionsResponse } from '@/api/types/vectore-store-collection';

interface AddBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  newBot: { name: string; description: string; collection: string; botPrompt: string };
  setNewBot: React.Dispatch<React.SetStateAction<typeof newBot>>;
  collections?: VectorStoreCollectionsResponse;
  onCreate: () => void;
  isCreating: boolean;
}

export default function AddBotModal({
  isOpen,
  onClose,
  newBot,
  setNewBot,
  collections,
  onCreate,
  isCreating,
}: AddBotModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Bot</DialogTitle>
          <DialogDescription>
            Create a new AI assistant and assign it to collections
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>Name</label>
            <Input
              value={newBot.name}
              onChange={e => setNewBot(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter bot name"
            />
          </div>
          <div>
            <label>Description</label>
            <Textarea
              value={newBot.description}
              onChange={e => setNewBot(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter bot description"
            />
          </div>
          <div>
            <label>Bot Prompt</label>
            <Textarea
              value={newBot.botPrompt}
              onChange={e => setNewBot(prev => ({ ...prev, botPrompt: e.target.value }))}
              placeholder="Enter bot prompt"
            />
          </div>
          <div>
            <label>Collection</label>
            <Select
              value={newBot.collection}
              onValueChange={val => setNewBot(prev => ({ ...prev, collection: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select collection" />
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onCreate}>
            {isCreating ? <Loader2 className="animate-spin h-4 w-4" /> : 'Create Bot'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
