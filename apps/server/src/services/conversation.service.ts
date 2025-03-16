import Conversation, { IConversation } from "../models/conversation.model";

export const saveConversation = async (
  user: string,
  messages: IConversation["messages"]
) => {
  return await Conversation.create({ user, messages });
};

export const getConversationsByUser = async (user: string) => {
  return await Conversation.find({ user }).sort({ createdAt: -1 });
};
