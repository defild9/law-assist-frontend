'use client';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Trash2, Database, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FileItem } from './FileItem';
import { FileUploadSection } from './FileUploadSection';
import { toast } from 'sonner';
import { useDeleteCollection, useDeleteFileFromCollection } from '@/hooks/useVectoreStore';

interface Collection {
  id: string;
  name: string;
  files: Array<{ source: string; lastUpdated: string }>;
}

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteCollection, isPending: isDeletingCollection } = useDeleteCollection({
    onSuccess: () => {
      toast.success('Колекцію успішно видалено');
      queryClient.invalidateQueries({ queryKey: ['vectorStoreCollectionsWithFiles'] });
      queryClient.invalidateQueries({ queryKey: ['vectorStoreCollections'] });
    },
    onError: () => {
      toast.error('Не вдалося видалити колекцію');
    },
  });

  const { mutate: deleteFileFromCollection, isPending: isDeletingFile } =
    useDeleteFileFromCollection({
      onSuccess: () => {
        toast.success('Файл успішно видалено');
        queryClient.invalidateQueries({ queryKey: ['vectorStoreCollectionsWithFiles'] });
      },
      onError: () => {
        toast.error('Не вдалося видалити файл');
      },
    });

  return (
    <div className="p-4 rounded-lg border space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          <h3 className="font-medium">{collection.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="text-red-600 hover:text-red-600"
            onClick={() => deleteCollection(collection.name)}
          >
            {isDeletingCollection ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {collection.files.length} {collection.files.length === 1 ? 'файл' : 'файли'}
      </p>

      <div className="space-y-2">
        {collection.files.map((file, idx) => (
          <FileItem
            key={idx}
            source={file.source}
            lastUpdated={file.lastUpdated}
            onDelete={() =>
              deleteFileFromCollection({ collectionName: collection.name, fileName: file.source })
            }
            isLoading={isDeletingFile}
          />
        ))}
      </div>

      <FileUploadSection collectionName={collection.name} />
    </div>
  );
}
