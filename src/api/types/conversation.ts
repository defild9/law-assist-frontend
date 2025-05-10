export interface Message {
  id: string;
  chatId: string;
  parentId: string | null;
  role: 'user' | 'assistant';
  content: string;
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
