'use client';

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
          <DialogTitle>Delete Bot</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this bot? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : 'Delete Bot'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
