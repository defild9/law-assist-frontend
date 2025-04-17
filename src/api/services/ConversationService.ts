import axiosInstance from "..";

interface Conversion {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export class ConversationService {
  public static async getConversations(): Promise<Conversion[]> {
    const response = await axiosInstance.get("/conversation");
    return response.data;
  }
}
