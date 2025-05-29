'use client';

import { useState } from 'react';
import { Scale, Loader2 } from 'lucide-react';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import SubscriptionPlanCard from '@/components/subscription-plan/SubscriptionPlanCard';

type BillingPeriod = {
  value: 'monthly' | 'yearly';
  label: string;
};

const BILLING_PERIODS: BillingPeriod[] = [
  { value: 'monthly', label: 'Щомісячно' },
  { value: 'yearly', label: 'Щорічно' },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const { data, isLoading, error } = useSubscriptionPlans();

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Не вдалося завантажити плани підписки</h2>
          <p className="text-muted-foreground">Будь ласка, спробуйте пізніше</p>
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
          <h1 className="text-4xl font-bold tracking-tight">Просте та прозоре ціноутворення</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Оберіть ідеальний план для своїх потреб. Усі плани включають безкоштовний пробний
            період.
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
              <span>Завантаження планів...</span>
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
            Усі плани включають необмежену кількість користувачів та доступ до служби підтримки.
            Ціни вказані в USD без урахування податків.
          </p>
        </div>
      </div>
    </div>
  );
}
