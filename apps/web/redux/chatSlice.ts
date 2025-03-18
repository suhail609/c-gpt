import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatState {
  selectedChatId: string | null;
  messages: string[];
}

const initialState: ChatState = {
  selectedChatId: null,
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
    addMessage: (state, action: PayloadAction<string>) => {
      if (state.selectedChatId) {
        state.messages.push(action.payload);
      }
    },
  },
});

export const { setSelectedChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
