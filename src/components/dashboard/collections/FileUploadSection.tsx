'use client';
import React, { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useUploadFileToCollection } from '@/hooks/useVectoreStore';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface FileUploadSectionProps {
  collectionName: string;
}

export function FileUploadSection({ collectionName }: FileUploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { mutate: uploadFileToCollection, isPending } = useUploadFileToCollection({
    onSuccess: () => {
      setSelectedFile(null);
      toast.success('Файл успішно завантажено');
      queryClient.invalidateQueries({ queryKey: ['vectorStoreCollectionsWithFiles'] });
    },
    onError: () => {
      toast.error('Сталася помилка під час завантаження файлу');
    },
  });

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={e => setSelectedFile(e.target.files?.[0] ?? null)}
        id={`file-upload-${collectionName}`}
      />
      <Button
        variant="outline"
        className="w-full"
        onClick={() => document.getElementById(`file-upload-${collectionName}`)?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        Завантажити PDF
      </Button>

      {selectedFile && (
        <div className="space-y-2 mt-2">
          <p className="text-sm font-medium">Вибраний файл:</p>
          <div className="text-sm text-muted-foreground">{selectedFile.name}</div>
          <Button
            className="w-full"
            onClick={() =>
              uploadFileToCollection({ file: selectedFile, collectionName: collectionName })
            }
          >
            {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : 'Завантажити'}
          </Button>
        </div>
      )}
    </>
  );
}
