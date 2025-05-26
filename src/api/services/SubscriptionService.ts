import axiosInstance from '..';
import { Subscription, SubscriptionListResponse } from '../types/subscription';

export class SubscriptionService {
  public static async getAllSubscriptions(params?: {
    page?: number;
    limit?: number;
    status?: 'active' | 'canceled' | 'paused' | 'expired';
    search?: string;
  }): Promise<SubscriptionListResponse> {
    const response = await axiosInstance.get<SubscriptionListResponse>('/subscriptions', {
      params,
    });

    return response.data;
  }
}
