"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trpc } from "../../lib/trpc";
import { RootState } from "../../redux/store";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { setSelectedChat } from "../../redux/chatHistorySlice";
import { addMessage, setMessages } from "../../redux/chatMessageSlice";

import { useRouter } from "next/navigation";
import { IMessage } from "../../../server/src/models/message.model";
const ChatPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  // const { selectedChatId } = useSelector(
  //   (state: RootState) => state.chatHistory
  // );
  // //   const { data: chats } = trpc.chat.getUserChats.query();

  // const test = async () => {
  //   console.log("insde test");

  //   const DDS = await trpc.chat.sendMessage.mutate({
  //     // chatId: chatId,
  //     content: "tell me back hello world",
  //   });

  //   console.log("test is working", DDS);
  // };

  // test();

  const sendMessage = async ({
    chatId,
    content,
  }: {
    chatId?: string;
    content: string;
  }) => {
    try {
      dispatch(addMessage({ content: content, isAI: false }));

      console.log("chatId");
      console.log({ chatId, content });

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
      console.error("Error sending message", error);
    }
  };

  // const handleSendMessage = async ({
  //   chatId,
  //   content,
  // }: {
  //   chatId?: string;
  //   content: string;
  // }) => {
  //   dispatch(addMessage({ content: content, isAI: false }));
  //   const response = await sendMessage({ chatId, content });
  //   dispatch(addMessage({ content: response.content, isAI: true }));
  // };

  // const handleSelectChat = async (selectedChatId: string) => {
  //   const response = await trpc.chat.getChatMessages.query({
  //     chatId: selectedChatId,
  //   });
  //   dispatch(setMessages(response));
  // };

  // useEffect(() => {
  //   if (selectedChatId) {
  //     handleSelectChat(selectedChatId);
  //   }
  // }, [selectedChatId]);

  if (!isAuthenticated) {
    router.push("/signin");
    return null;
  }

  return (
    <>
      {
        <main className="overflow-hidden w-full h-screen relative flex">
          <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
            <div className="flex h-full min-h-0 flex-col ">
              <Sidebar />
            </div>
          </div>
          <Chat handleSendMessage={sendMessage} />
        </main>
      }
    </>
  );
};

export default ChatPage;
