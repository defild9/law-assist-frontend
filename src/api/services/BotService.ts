import axiosInstance from '..';
import { CreateBot, GetAllBotsResponse, UpdateBot } from '../types/bots';

export class BotService {
  public static async getAllBots(
    search?: string,
    collection?: string
  ): Promise<GetAllBotsResponse> {
    const params = {
      ...(search && { search }),
      ...(collection && { collection }),
    };

    const response = await axiosInstance.get<GetAllBotsResponse>('/bots', { params });
    return response.data;
  }
  public static async createBot(createBot: CreateBot) {
    const response = await axiosInstance.post('/bots', createBot);
    return response.data;
  }
  public static async updateBot(botId: string, updateBot: UpdateBot) {
    const response = await axiosInstance.put(`/bots/${botId}`, updateBot);
    return response.data;
  }
  public static async deleteBot(botId: string) {
    const response = await axiosInstance.delete(`/bots/${botId}`);
    return response.data;
  }
}
