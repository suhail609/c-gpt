import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import Message from "./Message";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Chat = (props: any) => {
  const { handleSendMessage } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [messageContent, setMessageContent] = useState("");
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  const { messages } = useSelector((state: RootState) => state.chatMessages);
  const { selectedChatId } = useSelector(
    (state: RootState) => state.chatHistory
  );

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setShowEmptyChat(false);
  }, [selectedChatId]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    // Don't send empty messages
    if (messageContent.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    setIsLoading(true);
    // console.log("messageContent");
    // console.log(messageContent);
    handleSendMessage({ content: messageContent, chatId: selectedChatId });

    // Add the message to the messages
    // setMessages([
    //   ...messages,
    //   { content: messageContent, isAI: false },
    //   { content: null, isAI: true },
    // ]);

    // const gptResponse = await handleSendMessage();

    // setMessages([...messages, { content: gptResponse.content, isAI: true }]);

    // Clear the message & remove empty chat
    setMessageContent("");
    setShowEmptyChat(false);
  };

  const handleKeypress = (e: any) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full dark:bg-gray-800">
            <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
              {!showEmptyChat && messages.length > 0 ? (
                <div className="flex flex-col items-center text-sm bg-gray-800">
                  {messages.map((message, index) => (
                    <Message key={index} message={message} />
                  ))}
                  <div className="w-full h-32 md:h-48 flex-shrink-0"></div>
                  <div ref={bottomOfChatRef}></div>
                </div>
              ) : null}
              {showEmptyChat ? (
                <div className="py-10 relative w-full flex flex-col h-full">
                  <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 flex gap-2 items-center justify-center h-screen">
                    C-GPT
                  </h1>
                </div>
              ) : null}
              <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              {errorMessage ? (
                <div className="mb-2 md:mb-0">
                  <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  value={messageContent}
                  tabIndex={0}
                  data-id="root"
                  style={{
                    height: "24px",
                    maxHeight: "200px",
                    overflowY: "hidden",
                  }}
                  // rows={1}
                  placeholder="Send a message..."
                  className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0 focus:outline-none"
                  onChange={(e) => setMessageContent(e.target.value)}
                  onKeyDown={handleKeypress}
                ></textarea>
                <button
                  disabled={isLoading || messageContent?.length === 0}
                  onClick={sendMessage}
                  className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
                >
                  <FiSend className="h-4 w-4 mr-1 text-white " />
                </button>
              </div>
            </div>
          </form>
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
            <span>
              C-GPT may produce inaccurate information about people, places, or
              facts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
