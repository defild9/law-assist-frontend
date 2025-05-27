import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { SubscriptionPlanService } from '@/api/services/SubscriptionPlanService';
import {
  CreateSubscriptionPlanDto,
  PaginatedSubscriptionPlansResponse,
  UpdateSubscriptionPlanDto,
  SubscriptionPlan,
  CheckoutSubscriptionPlanResponse,
} from '@/api/types/subscriptin-plan';

export const useSubscriptionPlans = (
  search?: string,
  page?: number,
  limit?: number,
  options?: UseQueryOptions<PaginatedSubscriptionPlansResponse>
) => {
  return useQuery<PaginatedSubscriptionPlansResponse>({
    queryKey: ['subscription-plans', search, page, limit],
    queryFn: () => SubscriptionPlanService.getAllSubscriptionPlans(search, page, limit),
    ...options,
  });
};

export const useCreateSubscriptionPlan = (
  options?: UseMutationOptions<SubscriptionPlan, unknown, CreateSubscriptionPlanDto>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubscriptionPlanDto) =>
      SubscriptionPlanService.createSubscriptionPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
    },
    ...options,
  });
};

export const useUpdateSubscriptionPlan = (
  options?: UseMutationOptions<
    SubscriptionPlan,
    unknown,
    { id: string; data: UpdateSubscriptionPlanDto }
  >
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => SubscriptionPlanService.updateSubscriptionPlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
    },
    ...options,
  });
};

export const useDeleteSubscriptionPlan = (
  options?: UseMutationOptions<unknown, unknown, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SubscriptionPlanService.deleteSubscriptionPlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription-plans'] });
    },
    ...options,
  });
};

export const useCheckoutSubscriptionPlan = (
  options?: UseMutationOptions<CheckoutSubscriptionPlanResponse, unknown, string>
) => {
  return useMutation({
    mutationFn: (id: string) => SubscriptionPlanService.checkoutSubscriptionPlan(id),
    ...options,
  });
};
