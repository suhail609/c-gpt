"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

import { useRouter } from "next/navigation";
const ChatPage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

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
          <Chat />
        </main>
      }
    </>
  );
};

export default ChatPage;
