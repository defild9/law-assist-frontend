import axiosInstance from '..';
import {
  FeedbackTag,
  FeedbackType,
  PaginatedFeedbackResponse,
  FeedbackListApiResponse,
  Feedback,
  FeedbackItemApiResponse,
  CreateFeedbackRequest,
  UpdateFeedbackRequest,
  FeedbackDeleteApiResponse,
} from '../types/feedback';

export class FeedbackService {
  public static async getFeedbackList(
    page = 1,
    limit = 10,
    tag?: FeedbackTag,
    type?: FeedbackType
  ): Promise<PaginatedFeedbackResponse> {
    const params: Record<string, any> = { page, limit };
    if (tag) params.tag = tag;
    if (type) params.type = type;
    const resp = await axiosInstance.get<PaginatedFeedbackResponse>('/feedback', { params });
    return resp.data;
  }

  public static async getFeedbackById(id: string): Promise<Feedback> {
    const resp = await axiosInstance.get<FeedbackItemApiResponse>(`/feedback/${id}`);
    return resp.data.data!;
  }

  public static async createFeedback(dto: CreateFeedbackRequest): Promise<Feedback> {
    const resp = await axiosInstance.post<FeedbackItemApiResponse>('/feedback', dto);
    return resp.data.data!;
  }

  public static async updateFeedback(id: string, dto: UpdateFeedbackRequest): Promise<Feedback> {
    const resp = await axiosInstance.patch<FeedbackItemApiResponse>(`/feedback/${id}`, dto);
    return resp.data.data!;
  }

  public static async deleteFeedback(id: string): Promise<void> {
    await axiosInstance.delete<FeedbackDeleteApiResponse>(`/feedback/${id}`);
  }
}
