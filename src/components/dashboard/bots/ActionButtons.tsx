import { Button } from '@/components/ui/Button';
import { FolderPlus, Plus } from 'lucide-react';

interface ActionButtonsProps {
  onNewCollection: () => void;
  onNewBot: () => void;
}

export default function ActionButtons({ onNewCollection, onNewBot }: ActionButtonsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button onClick={onNewCollection}>
        <FolderPlus className="h-4 w-4 mr-2" />
        Нова колекція
      </Button>
      <Button onClick={onNewBot}>
        <Plus className="h-4 w-4 mr-2" />
        Новий бот
      </Button>
    </div>
  );
}
