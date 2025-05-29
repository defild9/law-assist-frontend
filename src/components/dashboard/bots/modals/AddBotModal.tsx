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
          <DialogTitle>Створити нового бота</DialogTitle>
          <DialogDescription>
            Створіть нового AI-помічника та призначте його до колекції
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>Назва</label>
            <Input
              value={newBot.name}
              onChange={e => setNewBot(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Введіть назву бота"
            />
          </div>
          <div>
            <label>Опис</label>
            <Textarea
              value={newBot.description}
              onChange={e => setNewBot(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Введіть опис бота"
            />
          </div>
          <div>
            <label>Промт бота</label>
            <Textarea
              value={newBot.botPrompt}
              onChange={e => setNewBot(prev => ({ ...prev, botPrompt: e.target.value }))}
              placeholder="Введіть промт для бота"
            />
          </div>
          <div>
            <label>Колекція</label>
            <Select
              value={newBot.collection}
              onValueChange={val => setNewBot(prev => ({ ...prev, collection: val }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Оберіть колекцію" />
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
            Скасувати
          </Button>
          <Button onClick={onCreate}>
            {isCreating ? <Loader2 className="animate-spin h-4 w-4" /> : 'Створити бота'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
