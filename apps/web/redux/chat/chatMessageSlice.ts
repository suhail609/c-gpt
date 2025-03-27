import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  // id: string;
  // chatId: string;
  content: string;
  isAI: boolean;
}

export interface ChatMessagesState {
  messages: Message[];
  isMessagesLoading: boolean;
}

const initialState: ChatMessagesState = {
  messages: [],
  isMessagesLoading: false,
};

const chatMessagesSlice = createSlice({
  name: "chatMessages",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    setMessagesLoading: (state, action: PayloadAction<boolean>) => {
      state.isMessagesLoading = action.payload;
    },
  },
});

export const { setMessages, addMessage, clearMessages, setMessagesLoading } =
  chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
