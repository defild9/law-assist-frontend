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

interface ChangeRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userEmail: string;
  newRole: string;
  isChanging: boolean;
  onConfirm: () => void;
}

export const ChangeRoleModal = ({
  open,
  onOpenChange,
  userEmail,
  newRole,
  isChanging,
  onConfirm,
}: ChangeRoleModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogPortal>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Зміна ролі користувача</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете змінити роль користувача {userEmail} на {newRole}? Це вплине на
            його права доступу та дозволи в системі.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={onConfirm} disabled={isChanging}>
            {isChanging ? <Loader2 className="animate-spin h-4 w-4" /> : 'Змінити роль'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);
