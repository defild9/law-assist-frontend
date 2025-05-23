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
          <DialogTitle>Create New Collection</DialogTitle>
          <DialogDescription>Create a new collection for storing documents</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Collection Name</label>
            <Input
              value={collectionName}
              onChange={e => setCollectionName(e.target.value)}
              placeholder="Enter collection name"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onCreate}>
            {isCreating ? <Loader2 className="animate-spin h-4 w-4" /> : 'Create Collection'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
