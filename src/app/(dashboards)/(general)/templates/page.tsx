'use client';

import { useState, useEffect } from 'react';
import { Scale, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { useDeleteDocumentTemplate, useDocumentTemplates } from '@/hooks/useDocumentTemplates';
import { format } from 'date-fns';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from '@/components/ui/Dialog';
import { MdPreview } from 'md-editor-rt';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function DocumentTemplates() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();
  const limit = 10;

  const { data, isLoading, error } = useDocumentTemplates(page, limit, search);
  const deleteTemplate = useDeleteDocumentTemplate({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Шаблон видалено');
    },
    onError: () => {
      toast.error('Не вдалося видалити шаблон');
    },
  });

  const templates = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;

  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  useEffect(() => {
    setPage(1);
  }, [search]);

  const openPreview = (title: string, content: string) => {
    setPreviewTitle(title);
    setPreviewContent(content);
  };

  const closePreview = () => {
    setPreviewContent(null);
    setPreviewTitle('');
  };

  return (
    <div className="bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Шаблони документів</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Пошук шаблонів..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 w-[300px]"
              />
            </div>
            <Button
              onClick={() => {
                router.push('/templates/add');
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Додати шаблон
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>Опис</TableHead>
                <TableHead>Категорія</TableHead>
                <TableHead>Оновлено</TableHead>
                <TableHead>Створено</TableHead>
                <TableHead className="text-right">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Завантаження…
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-red-500">
                    Помилка завантаження шаблонів
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && templates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Шаблонів не знайдено
                  </TableCell>
                </TableRow>
              )}
              {templates.map(tpl => (
                <TableRow key={tpl.id}>
                  <TableCell>
                    <p className="font-medium">{tpl.title}</p>
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <p className="truncate">{tpl.description ?? '—'}</p>
                  </TableCell>
                  <TableCell>{tpl.category ?? '—'}</TableCell>
                  <TableCell>{format(new Date(tpl.updatedAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(tpl.createdAt), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Dialog open={!!previewContent} onOpenChange={open => !open && closePreview()}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openPreview(tpl.title, tpl.content)}
                        >
                          Переглянути
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[90vw] max-w-5xl">
                        <DialogHeader>
                          <DialogTitle>{previewTitle}</DialogTitle>
                        </DialogHeader>
                        <div className="prose max-h-[60vh] overflow-auto">
                          <MdPreview value={previewContent!} />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Закрити</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        router.push(`/templates/update/${tpl.id}`);
                      }}
                    >
                      Редагувати
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          Видалити
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Видалити шаблон</AlertDialogTitle>
                          <AlertDialogDescription>
                            Ви впевнені, що хочете видалити &quot;{tpl.title}&quot;? Цю дію не можна
                            буде скасувати.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Скасувати</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteTemplate.mutate(tpl.id)}>
                            Видалити
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Сторінка {page} з {totalPages}
          </p>
          <div className="space-x-2">
            <Button size="sm" onClick={() => setPage(1)} disabled={page === 1}>
              Перша
            </Button>
            <Button
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Назад
            </Button>
            <Button
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Далі
            </Button>
            <Button size="sm" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
              Остання
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
