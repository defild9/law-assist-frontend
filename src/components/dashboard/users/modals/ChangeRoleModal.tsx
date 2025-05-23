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
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Are you sure you want to change the role of {userEmail} to {newRole}? This will affect
            the user’s permissions and access levels.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isChanging}>
            {isChanging ? <Loader2 className="animate-spin h-4 w-4" /> : 'Change Role'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  </Dialog>
);
