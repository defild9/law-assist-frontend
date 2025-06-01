import axiosInstance from '..';
import { CombinedStats } from '../types/statistic';

export class StatisticService {
  public static async getStatistic(days: number): Promise<CombinedStats> {
    const response = await axiosInstance.get<CombinedStats>(`/statistic?days=${days}`);
    return response.data;
  }
}
