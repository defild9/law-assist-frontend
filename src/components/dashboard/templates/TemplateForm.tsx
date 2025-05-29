'use client';

import { useState, useRef, useEffect } from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { toast } from 'sonner';
import { Upload, Loader2, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/TextArea';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { useConvertFileToMarkdown } from '@/hooks/useDocumentTemplates';

export interface TemplateFormValues {
  title: string;
  description: string;
  category: string;
  content: string;
  files?: File[];
}

interface TemplateFormProps {
  initialValues?: TemplateFormValues;
  onSubmit: (values: Omit<TemplateFormValues, 'files'>) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

export default function TemplateForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel,
}: TemplateFormProps) {
  const [form, setForm] = useState<TemplateFormValues>({
    title: '',
    description: '',
    category: '',
    content: '# Новий шаблон\n\nПочніть писати свій шаблон тут...',
    files: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title,
        description: initialValues.description,
        category: initialValues.category,
        content: initialValues.content,
        files: [],
      });
    }
  }, [initialValues]);

  const convertFile = useConvertFileToMarkdown({
    onSuccess: md => {
      setForm(prev => ({ ...prev, content: md }));
      toast.success('Файл перетворено в Markdown');
    },
    onError: () => toast.error('Не вдалося перетворити файл'),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const file = files[0];
    setForm(prev => ({ ...prev, files }));
    convertFile.mutate(file);
  };

  const handleRemoveFile = (index: number) => {
    setForm(prev => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index) || [],
    }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category || !form.content.trim()) {
      toast.error('Будь ласка, заповніть усі обовʼязкові поля');
      return;
    }
    onSubmit({
      title: form.title,
      description: form.description,
      category: form.category,
      content: form.content,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Назва</Label>
          <Input
            id="title"
            value={form.title}
            onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Введіть назву шаблону"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Опис</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Введіть опис шаблону"
            className="min-h-[100px]"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Категорія</Label>
          <Input
            id="category"
            value={form.category}
            onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
            placeholder="Введіть категорію шаблону"
          />
        </div>

        <div className="grid gap-2">
          <Label>Додані файли</Label>
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {form.files?.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm"
                >
                  <span className="truncate max-w-[200px]">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full"
                    onClick={() => handleRemoveFile(idx)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                {convertFile.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Завантажити та конвертувати
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Вміст шаблону</Label>
          <div className="border rounded-lg overflow-hidden">
            <MdEditor
              modelValue={form.content}
              onChange={val => setForm(prev => ({ ...prev, content: val }))}
              theme="light"
              previewTheme="github"
              language="uk-UA"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {submitLabel}
          </>
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
