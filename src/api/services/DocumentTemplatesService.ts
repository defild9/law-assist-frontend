import axiosInstance from '..';
import {
  Template,
  CreateTemplateResponse,
  GetTemplatesResponse,
  TemplateDetailResponse,
  UpdateTemplateResponse,
  DeleteTemplateResponse,
  ConvertMarkdownResponse,
} from '../types/document-tamplates';

export class DocumentTemplatesService {
  public static async createDocumentTemplate(dto: Partial<Template>): Promise<Template> {
    const resp = await axiosInstance.post<CreateTemplateResponse>('/templates', dto);
    return resp.data.data;
  }

  public static async getDocumentTemplates(
    page = 1,
    limit = 10,
    search?: string
  ): Promise<GetTemplatesResponse> {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;

    const resp = await axiosInstance.get<GetTemplatesResponse>('/templates', { params });
    return resp.data;
  }

  public static async getDocumentTemplateById(id: string): Promise<Template> {
    const resp = await axiosInstance.get<TemplateDetailResponse>(`/templates/${id}`);
    return resp.data.data;
  }

  public static async getDocumentTemplateByTitle(title: string): Promise<Template> {
    const resp = await axiosInstance.get<TemplateDetailResponse>(
      `/templates/title/${encodeURIComponent(title)}`
    );
    return resp.data.data;
  }

  public static async updateDocumentTemplate(
    id: string,
    dto: Partial<Template>
  ): Promise<Template> {
    const resp = await axiosInstance.patch<UpdateTemplateResponse>(`/templates/${id}`, dto);
    return resp.data.data;
  }

  public static async deleteDocumentTemplate(id: string): Promise<string> {
    const resp = await axiosInstance.delete<DeleteTemplateResponse>(`/templates/${id}`);
    return resp.data.message;
  }

  public static async convertFileToMarkdown(file: File): Promise<string> {
    const form = new FormData();
    form.append('file', file);
    const resp = await axiosInstance.post<ConvertMarkdownResponse>('/templates/convert', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return resp.data.data;
  }
}
