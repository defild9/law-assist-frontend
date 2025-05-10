import axiosInstance from '..';
import { Conversations, Conversation } from '../types/conversation';

export class ConversationService {
  public static async getConversations(page?: number, limit?: number) {
    const response = await axiosInstance.get<Conversations>('/conversation', {
      params: { page, limit },
    });
    return response.data;
  }
  public static async getConversation(id: string): Promise<Conversation> {
    const response = await axiosInstance.get<Conversation>(`/conversation/${id}`);
    return response.data;
  }
  public static async deleteConversation(id: string) {
    const response = await axiosInstance.delete(`/conversation/${id}`);
    return response.data;
  }
}
