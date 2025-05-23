'use client';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Scale } from 'lucide-react';

import LayoutNavigation from '@/components/dashboard/general/LayoutNavigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex h-screen bg-background">
        <div className="w-64 border-r bg-muted/30">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold">Law Assist</span>
          </div>

          <LayoutNavigation />
        </div>

        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </HydrationBoundary>
  );
}
