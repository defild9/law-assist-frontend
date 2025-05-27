import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { SubscriptionService } from '@/api/services/SubscriptionService';
import { SubscriptionListResponse } from '@/api/types/subscription';

interface UseSubscriptionsParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'canceled' | 'paused' | 'expired';
  search?: string;
}

export const useSubscriptions = (
  params: UseSubscriptionsParams = {},
  options?: UseQueryOptions<SubscriptionListResponse>
) => {
  return useQuery<SubscriptionListResponse>({
    queryKey: ['subscriptions', params],
    queryFn: () => SubscriptionService.getAllSubscriptions(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
