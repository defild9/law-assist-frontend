'use client';
export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useFeedbackList } from '@/hooks/useFeedback';
import { FeedbackType, FeedbackTag } from '@/api/types/feedback';
import { Loader2 } from 'lucide-react';
import { FeedbackFilters } from '@/components/dashboard/feedbacks/FeedbackFilters';
import { FeedbackStats } from '@/components/dashboard/feedbacks/FeedbackStats';
import { FeedbackTable } from '@/components/dashboard/feedbacks/FeedbackTable';

export default function FeedbackPage() {
  const [filterType, setFilterType] = useState<'all' | FeedbackType>('all');
  const [filterTag, setFilterTag] = useState<'all' | FeedbackTag>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useFeedbackList(
    1,
    100,
    filterTag !== 'all' ? filterTag : undefined,
    filterType !== 'all' ? filterType : undefined
  );

  const list = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Помилка завантаження відгуків</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <FeedbackStats feedbackList={list} />
        <FeedbackFilters
          filterType={filterType}
          setFilterType={setFilterType}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <FeedbackTable feedbackList={list} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
