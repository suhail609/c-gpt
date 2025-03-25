import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import chatHistoryReducer from "./chat/chatHistorySlice";
import chatMessageReducer from "./chat/chatMessageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatHistory: chatHistoryReducer,
    chatMessages: chatMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
