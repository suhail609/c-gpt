export type UserChatDTO = {
  id: string;
  userId: string;
  createdAt: string;
  lastMessage?: string;
};


// id: message._id.toString(),
// userId: message.userId.toString(),
// chatId: message.chatId.toString(),
// content: message.content,
// isAI: message.isAI,
// createdAt: message.createdAt.toISOString(),