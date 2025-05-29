'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import React from 'react';
import { Loader2 } from 'lucide-react';

interface AddCollectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionName: string;
  setCollectionName: (name: string) => void;
  onCreate: () => void;
  isCreating: boolean;
}

export function AddCollectionModal({
  open,
  onOpenChange,
  collectionName,
  setCollectionName,
  onCreate,
  isCreating,
}: AddCollectionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Створити нову колекцію</DialogTitle>
          <DialogDescription>Створіть нову колекцію для зберігання документів</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Назва колекції</label>
            <Input
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
              placeholder="Введіть назву колекції"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Скасувати
          </Button>
          <Button onClick={onCreate}>
            {isCreating ? <Loader2 className="animate-spin h-4 w-4" /> : 'Створити колекцію'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
