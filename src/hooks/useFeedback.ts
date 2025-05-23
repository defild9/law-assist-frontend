import { FeedbackService } from '@/api/services/FeedbackService';
import {
  FeedbackTag,
  FeedbackType,
  PaginatedFeedbackResponse,
  Feedback,
  CreateFeedbackRequest,
  UpdateFeedbackRequest,
} from '@/api/types/feedback';
import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

export const useFeedbackList = (
  page = 1,
  limit = 10,
  tag?: FeedbackTag,
  type?: FeedbackType,
  options?: UseQueryOptions<PaginatedFeedbackResponse>
) => {
  return useQuery<PaginatedFeedbackResponse>({
    queryKey: ['feedback', { page, limit, tag, type }],
    queryFn: () => FeedbackService.getFeedbackList(page, limit, tag, type),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useFeedback = (id: string, options?: UseQueryOptions<Feedback>) => {
  return useQuery<Feedback>({
    queryKey: ['feedback', id],
    queryFn: () => FeedbackService.getFeedbackById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateFeedback = (
  options?: UseMutationOptions<Feedback, unknown, CreateFeedbackRequest>
) => {
  return useMutation<Feedback, unknown, CreateFeedbackRequest>({
    mutationFn: dto => FeedbackService.createFeedback(dto),
    ...options,
  });
};

export const useUpdateFeedback = (
  options?: UseMutationOptions<Feedback, unknown, { id: string; data: UpdateFeedbackRequest }>
) => {
  return useMutation<Feedback, unknown, { id: string; data: UpdateFeedbackRequest }>({
    mutationFn: ({ id, data }) => FeedbackService.updateFeedback(id, data),
    ...options,
  });
};

export const useDeleteFeedback = (options?: UseMutationOptions<void, unknown, string>) => {
  return useMutation<void, unknown, string>({
    mutationFn: id => FeedbackService.deleteFeedback(id),
    ...options,
  });
};
