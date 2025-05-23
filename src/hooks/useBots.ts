import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { BotService } from '@/api/services/BotService';
import { CreateBot, GetAllBotsResponse, UpdateBot } from '@/api/types/bots';

export const useBots = (
  search?: string,
  collection?: string,
  options?: UseQueryOptions<GetAllBotsResponse>
) => {
  return useQuery<GetAllBotsResponse>({
    queryKey: ['bots', search, collection],
    queryFn: () => BotService.getAllBots(search, collection),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
export const useCreateBot = (options?: UseMutationOptions<unknown, unknown, CreateBot>) => {
  return useMutation({
    mutationFn: (newBot: CreateBot) => BotService.createBot(newBot),
    ...options,
  });
};

export const useUpdateBot = (
  options?: UseMutationOptions<unknown, unknown, { botId: string; data: UpdateBot }>
) => {
  return useMutation({
    mutationFn: ({ botId, data }: { botId: string; data: UpdateBot }) =>
      BotService.updateBot(botId, data),
    ...options,
  });
};

export const useDeleteBot = (options?: UseMutationOptions<unknown, unknown, string>) => {
  return useMutation({
    mutationFn: (botId: string) => BotService.deleteBot(botId),
    ...options,
  });
};
