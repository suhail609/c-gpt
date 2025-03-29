import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  id: string;
  title?: string;
}

export interface ChatHistoryState {
  chats: Chat[];
  selectedChatId: string | null;
}

const initialState: ChatHistoryState = {
  chats: [],
  selectedChatId: null,
};

const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.unshift(action.payload);
    },
    setSelectedChat: (state, action: PayloadAction<string>) => {
      state.selectedChatId = action.payload;
    },
    clearChatSelection: (state) => {
      state.selectedChatId = null;
    },
  },
});

export const { setChats, addChat, setSelectedChat, clearChatSelection } =
  chatHistorySlice.actions;
export default chatHistorySlice.reducer;
