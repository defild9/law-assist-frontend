'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useDocumentTemplate, useUpdateDocumentTemplate } from '@/hooks/useDocumentTemplates';
import { Template } from '@/api/types/document-tamplates';
import TemplateForm, { TemplateFormValues } from '@/components/dashboard/templates/TemplateForm';

export default function UpdateTemplatePage() {
  const params = useParams();
  const rawId = params.id;
  const templateId = Array.isArray(rawId) ? rawId[0] : rawId || '';

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading: loadingTemplate } = useDocumentTemplate(templateId);

  const updateTemplate = useUpdateDocumentTemplate({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Шаблон успішно оновлено');
      router.push('/templates');
    },
    onError: () => toast.error('Не вдалося оновити шаблон'),
  });

  if (loadingTemplate || !data) {
    return <div>Завантаження...</div>;
  }

  const tpl: Template = data;

  const handleSubmit = (values: Omit<TemplateFormValues, 'files'>) => {
    updateTemplate.mutate({ id: tpl.id, data: values });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Оновити шаблон документа</h1>
        <TemplateForm
          initialValues={{
            title: tpl.title,
            description: tpl.description || '',
            category: tpl.category || '',
            content: tpl.content,
          }}
          onSubmit={handleSubmit}
          isSubmitting={updateTemplate.isPending}
          submitLabel="Оновити шаблон"
        />
      </div>
    </div>
  );
}
