import { useDispatch } from "react-redux";
import { trpc } from "../../lib/trpc";
import {
  setChats,
  setSelectedChat,
  clearChatSelection,
} from "./chatHistorySlice";
import {
  addMessage,
  setMessages,
  clearMessages,
  setMessagesLoading,
} from "./chatMessageSlice";

export const useChatActions = () => {
  const dispatch = useDispatch();

  const getAllChats = async () => {
    try {
      const response = await trpc.chat.getUserChats.query();
      const chats = response.map((chat) => ({
        id: chat._id || "",
        title: chat.lastMessage || "",
      }));
      dispatch(setChats(chats));
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const getChatMessages = async ({ chatId }: { chatId: string }) => {
    try {
      dispatch(setMessagesLoading(true));
      const response = await trpc.chat.getChatMessages.query({
        chatId: chatId,
      });
      const messages = response.map((message) => ({
        //@ts-ignore
        content: message.content || "",
        //@ts-ignore
        isAI: message.isAI || false,
      }));
      dispatch(setMessages(messages));
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    } finally {
      dispatch(setMessagesLoading(false));
    }
  };

  const sendMessage = async ({
    chatId,
    content,
  }: {
    chatId?: string;
    content: string;
  }) => {
    try {
      dispatch(setMessagesLoading(true));
      dispatch(addMessage({ content: content, isAI: false }));

      const response = await trpc.chat.sendMessage.mutate({
        chatId: chatId,
        content: content,
      });

      dispatch(
        addMessage({
          //@ts-ignore
          content: response.content,
          //@ts-ignore
          isAI: response.isAI,
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      dispatch(setMessagesLoading(false));
    }
  };

  const selectChat = ({ selectedChatId }: { selectedChatId: string }) => {
    dispatch(setSelectedChat(selectedChatId));
  };

  const clearSelectedChatAndMessages = () => {
    dispatch(clearChatSelection());
    dispatch(clearMessages());
  };

  return {
    getAllChats,
    getChatMessages,
    sendMessage,
    selectChat,
    clearSelectedChatAndMessages,
  };
};
