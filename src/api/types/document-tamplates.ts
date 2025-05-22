export interface Template {
  id: string;
  title: string;
  description?: string;
  content: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export type CreateTemplateResponse = ApiResponse<Template>;

export interface GetTemplatesResponse {
  data: Template[];
  total: number;
  page: number;
  totalPages: number;
}

export type TemplateDetailResponse = ApiResponse<Template>;

export type UpdateTemplateResponse = ApiResponse<Template>;

export interface DeleteTemplateResponse {
  statusCode: number;
  message: string;
}

export type ConvertMarkdownResponse = ApiResponse<string>;
