export type ChatMessagesDTO = {
  id: string;
  userId: string;
  chatId: string;
  content: string;
  isAI: boolean;
  createdAt: string;
}[];
