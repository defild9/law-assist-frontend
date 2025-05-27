export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
  stripePriceId?: string;
}

export interface SubscriptionUser {
  id: string;
  email: string;
  role: 'user' | 'admin' | 'lawyer';
  refreshToken: string;
  isEmailVerified: boolean;
  verificationToken?: string;
  trialEndsAt: string | null;
  lastPaymentDate: string | null;
  createdAt: string;
  updatedAt: string;
  subscription?: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'paused' | 'expired';
  startDate: string;
  endDate?: string;
  renewalDate?: string;
  cancellationDate?: string | null;
  autoRenew: boolean;
  createdAt: string;
  updatedAt: string;
  user: SubscriptionUser;
  plan: SubscriptionPlan;
}

export interface SubscriptionListResponse {
  data: Subscription[];
  total: number;
  page: number;
  totalPages: number;
}
