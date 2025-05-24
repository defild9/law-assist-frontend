export interface ImagePart {
  type: 'image_url';
  image_url: {
    url: string;
  };
}

export interface FilePart {
  type: 'file';
  file: {
    file_data: string;
    filename: string;
  };
}

export type FilePartItem = ImagePart | FilePart;
export interface Message {
  id: string;
  chatId: string;
  parentId: string | null;
  role: 'user' | 'assistant';
  content: string;
  files?: FilePartItem[];
  children: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface ConversationPreview {
  id: string;
  userId: string;
  title: string;
  messages: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Conversations {
  conversations: ConversationPreview[];
  total: number;
  page: number;
  totalPages: number;
}

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  files?: FilePartItem[];
};
