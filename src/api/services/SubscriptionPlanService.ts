import axiosInstance from '..';
import {
  CheckoutSubscriptionPlanResponse,
  CreateSubscriptionPlanDto,
  PaginatedSubscriptionPlansResponse,
  UpdateSubscriptionPlanDto,
} from '../types/subscriptin-plan';

export class SubscriptionPlanService {
  public static async getAllSubscriptionPlans(search?: string, page?: number, limit?: number) {
    const params = {
      ...(search && { search }),
      ...(page && { page }),
      ...(limit && { limit }),
    };
    const response = await axiosInstance.get<PaginatedSubscriptionPlansResponse>(
      '/subscription-plans',
      { params }
    );
    return response.data;
  }

  public static async createSubscriptionPlan(createSubscriptionPlan: CreateSubscriptionPlanDto) {
    const response = await axiosInstance.post('/subscription-plans', createSubscriptionPlan);
    return response.data;
  }

  public static async updateSubscriptionPlan(
    id: string,
    updateSubscriptionPlan: UpdateSubscriptionPlanDto
  ) {
    const response = await axiosInstance.patch(`/subscription-plans/${id}`, updateSubscriptionPlan);
    return response.data;
  }

  public static async deleteSubscriptionPlan(id: string) {
    const response = await axiosInstance.delete(`/subscription-plans/${id}`);
    return response.data;
  }
  public static async checkoutSubscriptionPlan(planId: string) {
    const response = await axiosInstance.post<CheckoutSubscriptionPlanResponse>(`/checkout`, {
      planId,
    });
    return response.data;
  }
}
