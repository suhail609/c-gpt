import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatHistoryReducer from "./chatHistorySlice";
import chatMessageReducer from "./chatMessageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatHistory: chatHistoryReducer,
    chatMessages: chatMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
