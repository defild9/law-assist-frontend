import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';

interface DeleteBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export default function DeleteBotModal({
  isOpen,
  onClose,
  onDelete,
  isDeleting,
}: DeleteBotModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити бота</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити цього бота? Цю дію не можна буде скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : 'Видалити бота'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
