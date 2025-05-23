export interface CreateBot {
  name: string;
  chromaCollection: string;
  description: string;
  botPrompt?: string;
}

export interface Bot {
  id: string;
  name: string;
  chromaCollection: string;
  description: string;
  botPrompt?: string;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateBot {
  name?: string;
  chromaCollection?: string;
  botPrompt?: string;
  description?: string;
}

export interface GetAllBotsResponse {
  status: string;
  bots: Bot[];
}
