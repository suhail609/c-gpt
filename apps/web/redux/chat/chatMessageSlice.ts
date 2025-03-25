import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  // id: string;
  // chatId: string;
  content: string;
  isAI: boolean;
}

export interface ChatMessagesState {
  messages: Message[];
}

const initialState: ChatMessagesState = {
  messages: [],
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
  },
});

export const { setMessages, addMessage, clearMessages } =
  chatMessagesSlice.actions;
export default chatMessagesSlice.reducer;
