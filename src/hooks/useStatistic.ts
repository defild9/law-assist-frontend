import { useQuery } from '@tanstack/react-query';
import { StatisticService } from '@/api/services/StatisticService';
import { CombinedStats } from '@/api/types/statistic';

export const useStatistic = (days: number = 7) => {
  return useQuery<CombinedStats>({
    queryKey: ['statistic', days],
    queryFn: () => StatisticService.getStatistic(days),
  });
};
