import { DocumentTemplatesService } from '@/api/services/DocumentTemplatesService';
import { GetTemplatesResponse, Template } from '@/api/types/document-tamplates';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

export const useDocumentTemplates = (
  page = 1,
  limit = 10,
  search?: string,
  options?: UseQueryOptions<GetTemplatesResponse>
) => {
  return useQuery<GetTemplatesResponse>({
    queryKey: ['templates', { page, limit, search }],
    queryFn: () => DocumentTemplatesService.getDocumentTemplates(page, limit, search),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useDocumentTemplate = (id: string, options?: UseQueryOptions<Template>) => {
  return useQuery<Template>({
    queryKey: ['template', id],
    queryFn: () => DocumentTemplatesService.getDocumentTemplateById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateDocumentTemplate = (
  options?: UseMutationOptions<Template, unknown, Partial<Template>>
) => {
  return useMutation<Template, unknown, Partial<Template>>({
    mutationFn: dto => DocumentTemplatesService.createDocumentTemplate(dto),
    ...options,
  });
};

export const useUpdateDocumentTemplate = (
  options?: UseMutationOptions<Template, unknown, { id: string; data: Partial<Template> }>
) => {
  return useMutation<Template, unknown, { id: string; data: Partial<Template> }>({
    mutationFn: ({ id, data }) => DocumentTemplatesService.updateDocumentTemplate(id, data),
    ...options,
  });
};

export const useDeleteDocumentTemplate = (
  options?: UseMutationOptions<string, unknown, string>
) => {
  return useMutation<string, unknown, string>({
    mutationFn: id => DocumentTemplatesService.deleteDocumentTemplate(id),
    ...options,
  });
};

export const useConvertFileToMarkdown = (options?: UseMutationOptions<string, unknown, File>) => {
  return useMutation<string, unknown, File>({
    mutationFn: file => DocumentTemplatesService.convertFileToMarkdown(file),
    ...options,
  });
};
