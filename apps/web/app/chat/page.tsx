"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trpc } from "../../lib/trpc";
import { RootState } from "../../redux/store";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { setSelectedChat } from "../../redux/chatHistorySlice";
import { addMessage, setMessages } from "../../redux/chatMessageSlice";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { selectedChatId } = useSelector(
    (state: RootState) => state.chatHistory
  );
  //   const { data: chats } = trpc.chat.getUserChats.query();
  const { mutate: sendMessage } = trpc.chat.sendMessage;

  const handleSendMessage = async ({
    chatId,
    content,
  }: {
    chatId?: string;
    content: string;
  }) => {
    dispatch(addMessage({ content: content, isAI: false }));
    const response = await sendMessage({ chatId, content });
    dispatch(addMessage({ content: response.content, isAI: true }));
  };

  const handleSelectChat = async (selectedChatId: string) => {
    const response = await trpc.chat.getChatMessages.query({
      chatId: selectedChatId,
    });
    dispatch(setMessages(response));
  };

  useEffect(() => {
    if (selectedChatId) {
      handleSelectChat(selectedChatId);
    }
  }, [selectedChatId]);

  return (
    <>
      <main className="overflow-hidden w-full h-screen relative flex">
        <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
          <div className="flex h-full min-h-0 flex-col ">
            <Sidebar />
          </div>
        </div>
        <Chat handleSendMessage={handleSendMessage} />
      </main>
    </>
  );
};

export default ChatPage;
