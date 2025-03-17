import Chat from "../models/chat.model";

export const sendMessage = async ({
  chatId,
  content,
}: {
  chatId?: string;
  content: string;
}) => {
  /**
   * if chatId find the chat get the openAi thread from it
   * save user message
   * send the message to openai
   * save gpt response to message collection
   *
   * if not chatId create new chat
   * save the user message
   * create new openai thread
   * save the gpt response to message collection
   */
};

export const getUserChats = async ({ userId }: { userId: string }) => {
  /**
   * get all the chat of the user from the chat
   */
};

export const getChatMessages = async ({ chatId }: { chatId: string }) => {
  /**
   * get all the messages of the chat with chatId
   */
};
