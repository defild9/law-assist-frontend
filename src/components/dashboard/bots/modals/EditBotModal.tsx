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
          <DialogTitle>Редагувати бота</DialogTitle>
          <DialogDescription>Оновіть інформацію та налаштування бота</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>Назва</label>
            <Input
              value={selectedBot.name}
              onChange={e =>
                setSelectedBot(prev => (prev ? { ...prev, name: e.target.value } : null))
              }
            />
          </div>
          <div>
            <label>Опис</label>
            <Textarea
              value={selectedBot.description || ''}
              onChange={e =>
                setSelectedBot(prev => (prev ? { ...prev, description: e.target.value } : null))
              }
            />
          </div>
          <div>
            <label>Промт бота</label>
            <Textarea
              value={selectedBot.botPrompt}
              onChange={e =>
                setSelectedBot(prev => (prev ? { ...prev, botPrompt: e.target.value } : null))
              }
            />
          </div>
          <div>
            <label>Колекція</label>
            <Select
              value={selectedBot.chromaCollection}
              onValueChange={val =>
                setSelectedBot(prev => (prev ? { ...prev, chromaCollection: val } : null))
              }
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
          <Button
            variant="outline"
            onClick={() => {
              setSelectedBot(null);
              onClose();
            }}
          >
            Скасувати
          </Button>
          <Button onClick={onUpdate}>
            {isUpdating ? <Loader2 className="animate-spin h-4 w-4" /> : 'Оновити бота'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
