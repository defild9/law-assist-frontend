export interface CreateBot {
  name: string;
  chromaCollectionName: string;
  description: string;
}

export interface Bot {
  id: string;
  name: string;
  chromaCollectionName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateBot {
  name?: string;
  chromaCollectionName?: string;
  description?: string;
}

export interface GetAllBotsResponse {
  status: string;
  bots: Bot[];
}
