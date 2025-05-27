'use client';

import { Check, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { SubscriptionPlan } from '@/api/types/subscriptin-plan';
import { toast } from 'sonner';
import { useCheckoutSubscriptionPlan } from '@/hooks/useSubscriptionPlans';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  billingPeriod: 'monthly' | 'yearly';
}

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  featureA: 'Access to all basic features',
  featureB: 'Priority customer support',
};

export default function SubscriptionPlanCard({ plan, billingPeriod }: SubscriptionPlanCardProps) {
  const checkout = useCheckoutSubscriptionPlan({
    onSuccess: data => {
      window.location.href = data.url;
    },
    onError: () => {
      toast.error('Failed to initiate checkout');
    },
  });

  const getAdjustedPrice = (basePrice: number) => {
    return billingPeriod === 'yearly' ? basePrice * 12 : basePrice;
  };

  const handleSubscribe = () => {
    checkout.mutate(plan.id);
  };

  return (
    <Card className="relative flex flex-col">
      {plan.trialPeriodDays && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 rounded-full text-xs text-primary-foreground">
          {plan.trialPeriodDays} days free trial
        </div>
      )}

      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{plan.name}</span>
            <div className="text-right">
              <div className="text-2xl font-bold">${getAdjustedPrice(plan.price).toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                per {billingPeriod === 'yearly' ? 'year' : 'month'}
              </div>
            </div>
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-4">
          {plan.features.map(feature => (
            <li key={feature} className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-primary" />
              </div>
              <span className="text-sm">{FEATURE_DESCRIPTIONS[feature] || feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button className="w-full gap-2" onClick={handleSubscribe} disabled={checkout.isPending}>
          <CreditCard className="h-4 w-4" />
          {checkout.isPending ? 'Redirecting...' : 'Subscribe Now'}
        </Button>
      </CardFooter>
    </Card>
  );
}
