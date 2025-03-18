"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { trpc } from "../../lib/trpc";
import { setSelectedChat, addMessage } from "../../redux/chatSlice";
import { RootState } from "../../redux/store";

const Chat = () => {
  const dispatch = useDispatch();
  const { selectedChatId, messages } = useSelector(
    (state: RootState) => state.chat
  );
  //   const { data: chats } = trpc.chat.getUserChats.query();
  const { mutate: sendMessage } = trpc.chat.sendMessage;

  useEffect(() => {
    if (selectedChatId) {
      //   trpc.chat.getMessages.useQuery({ chatId: selectedChatId });
      trpc.chat.getChatMessages.query({ chatId: selectedChatId });
    }
  }, [selectedChatId]);

  const handleSendMessage = (message: string) => {
    sendMessage({ chatId: selectedChatId!, content: message });
    dispatch(addMessage(message));
  };

  return (
    <div className="flex flex-row">
      <div className="bg-gray-500 w-40">{/* for  chat history */}</div>
      <div className="flex flex-col h-screen w-full">
        <div className="flex-1 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="p-2">
              {msg}
            </div>
          ))}
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Type your message"
            className="w-full p-2 border border-gray-300 rounded"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e.currentTarget.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
