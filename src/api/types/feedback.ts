import { ApiResponse } from './document-tamplates';

export enum FeedbackType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export enum FeedbackTag {
  TOO_SHORT = 'too short',
  OFF_TOPIC = 'off-topic',
  HELPFUL = 'helpful',
  HARMFUL = 'harmful',
  SPAM = 'spam',
  OTHER = 'other',
}

export interface Feedback {
  id: string;
  user: string;
  message: string;
  type: FeedbackType;
  tag: FeedbackTag;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFeedbackRequest {
  message: string;
  type: FeedbackType;
  tag?: FeedbackTag;
  comment?: string;
}

export interface UpdateFeedbackRequest {
  type?: FeedbackType;
  tag?: FeedbackTag;
  comment?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export type PaginatedFeedbackResponse = PaginatedResponse<Feedback>;

export type FeedbackListApiResponse = ApiResponse<PaginatedFeedbackResponse>;

export type FeedbackItemApiResponse = ApiResponse<Feedback>;

export type FeedbackDeleteApiResponse = ApiResponse<null>;
