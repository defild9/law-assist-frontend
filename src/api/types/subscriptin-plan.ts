export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  trialPeriodDays?: number;
  stripePriceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSubscriptionPlansResponse {
  status: 'success';
  data: SubscriptionPlan[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateSubscriptionPlanDto {
  name: string;
  price: number;
  description: string;
  features: string[];
  trialPeriodDays?: number;
}

export type UpdateSubscriptionPlanDto = Partial<CreateSubscriptionPlanDto>;

export interface CheckoutSubscriptionPlanResponse {
  sessionId: string;
  url: string;
}
