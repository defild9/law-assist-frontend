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
  DialogClose,
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
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            {isDeleting ? <Loader2 className="animate-spin h-4 w-4" /> : 'Delete User'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);
