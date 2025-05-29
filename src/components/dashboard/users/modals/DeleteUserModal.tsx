'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';

interface DeleteUserModalProps {
  open: boolean;
  onOpenChange: () => void;
  isDeleting: boolean;
  onDelete: () => void;
}

export const DeleteUserModal = ({
  open,
  onOpenChange,
  onDelete,
  isDeleting,
}: DeleteUserModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалення користувача</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити цього користувача? Цю дію неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            Скасувати
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : 'Видалити користувача'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);
