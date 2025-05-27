'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Scale, Check, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import SubscriptionPlanCard from '@/components/subscription-plan/SubscriptionPlanCard';

type BillingPeriod = {
  value: 'monthly' | 'yearly';
  label: string;
};

const BILLING_PERIODS: BillingPeriod[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];

export default function PricingPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const { data, isLoading, error } = useSubscriptionPlans();

  const handleSubscribe = async (planId: string, planName: string) => {
    try {
      // Here you would typically make an API call to initiate the subscription
      console.log('Subscribing to plan:', planId);
      toast.success(`Successfully subscribed to ${planName}`);
      router.push(`/profile/subscriptions/success?plan=${planName}`);
    } catch (error) {
      toast.error('Failed to subscribe to plan');
    }
  };

  const getAdjustedPrice = (basePrice: number) => {
    if (billingPeriod === 'yearly') {
      return basePrice * 12;
    }
    return basePrice;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Failed to load subscription plans</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Scale className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your needs. All plans include a free trial period.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 rounded-lg border p-1">
            {BILLING_PERIODS.map(period => (
              <button
                key={period.value}
                onClick={() => setBillingPeriod(period.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingPeriod === period.value
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading plans...</span>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {data?.data.map(plan => (
              <SubscriptionPlanCard key={plan.id} plan={plan} billingPeriod={billingPeriod} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            All plans include unlimited users and access to our customer support. Prices are in USD
            and exclude applicable taxes.
          </p>
        </div>
      </div>
    </div>
  );
}
