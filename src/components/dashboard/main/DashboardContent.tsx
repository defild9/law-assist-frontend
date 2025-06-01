'use client';

import { useState } from 'react';
import { Loader2, Users, Bot, Scale, MessageSquare, CreditCard, Video } from 'lucide-react';

import { useStatistic } from '@/hooks/useStatistic';
import { DashboardHeader } from './DashboardHeader';
import { ActivityChart } from './ActivityChart';
import { FeedbackChart } from './FeedbackChart';
import { StatCard } from './StatCard';
import VideoConsultation from '@/components/profile/VideoConsultation';
import { useUserRole } from '@/hooks/useUserRole';

export default function DashboardContent() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const days = parseInt(period);
  const { data, isLoading } = useStatistic(days);
  const { isAdmin } = useUserRole();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader period={period} setPeriod={setPeriod} />

        {isLoading || !data ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {isAdmin && (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                  title="Всього користувачів"
                  icon={<Users className="h-4 w-4 text-muted-foreground" />}
                  value={data.summary.totalUsers}
                  growth={data.summary.userGrowth}
                  days={days}
                />
                <StatCard
                  title="Підписки"
                  icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
                  value={data.summary.totalSubscriptions}
                  growth={data.summary.subscriptionGrowth}
                  days={days}
                />
                <StatCard
                  title="Юристи"
                  icon={<Scale className="h-4 w-4 text-muted-foreground" />}
                  value={data.summary.totalLawyers}
                  growth={data.summary.lawyerGrowth}
                  days={days}
                />
              </div>
            )}

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <StatCard
                title="Відгуки"
                icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
                value={data.summary.totalFeedback}
                growth={data.summary.feedbackGrowth}
                days={days}
              />
              <StatCard
                title="Активні боти"
                icon={<Bot className="h-4 w-4 text-muted-foreground" />}
                value={data.summary.totalBots}
                growth={data.summary.botGrowth}
                days={days}
              />
              <StatCard
                title="Відео консультації"
                icon={<Video className="h-4 w-4 text-muted-foreground" />}
                value={data.summary.totalVideoConsultations}
                growth={data.summary.vcGrowth}
                days={days}
              />
            </div>

            {/* Графіки */}
            <div className={`grid gap-6 ${!isAdmin ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
              {isAdmin && <ActivityChart data={data.activity} />}
              <FeedbackChart
                tagsStatus={data.feedback.tagsStatus}
                likePercent={data.feedback.likePercent}
                dislikePercent={data.feedback.dislikePercent}
              />
              {!isAdmin && <VideoConsultation />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
