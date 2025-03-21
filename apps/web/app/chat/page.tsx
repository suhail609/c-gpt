"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trpc } from "../../lib/trpc";
import { setChats } from "../../redux/chatHistorySlice";
import { addMessage, setMessages } from "../../redux/chatMessageSlice";
import { RootState } from "../../redux/store";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

import { useRouter } from "next/navigation";
const ChatPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { selectedChatId } = useSelector(
    (state: RootState) => state.chatHistory
  );
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await trpc.chat.getUserChats.query();
        //TODO: type error here
        const chats = response.map((chat) => ({
          id: chat._id || "",
          title: chat.lastMessage || "",
        }));
        dispatch(setChats(chats));
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [dispatch]);

  useEffect(() => {
    const fetchSelectedChatMessages = async () => {
      try {
        if (selectedChatId) {
          const response = await trpc.chat.getChatMessages.query({
            chatId: selectedChatId,
          });
          const messages = response.map((message) => ({
            //@ts-ignore
            content: message.content || "",
            //@ts-ignore
            isAI: message.isAI || false,
          }));
          dispatch(setMessages(messages));
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };
    fetchSelectedChatMessages();
  }, [selectedChatId, dispatch]);

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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

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
