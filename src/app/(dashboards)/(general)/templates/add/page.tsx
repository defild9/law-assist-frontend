'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateDocumentTemplate } from '@/hooks/useDocumentTemplates';
import TemplateForm, { TemplateFormValues } from '@/components/dashboard/templates/TemplateForm';

export default function AddTemplatePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createTemplate = useCreateDocumentTemplate({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      toast.success('Template saved successfully');
      router.push('/templates');
    },
    onError: () => toast.error('Failed to save template'),
  });

  const handleSubmit = (values: Omit<TemplateFormValues, 'files'>) => {
    createTemplate.mutate(values);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Document Template</h1>
        <TemplateForm
          onSubmit={handleSubmit}
          isSubmitting={createTemplate.isPending}
          submitLabel="Save Template"
        />
      </div>
    </div>
  );
}
