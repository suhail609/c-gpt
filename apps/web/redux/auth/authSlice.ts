import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  token: string | null;
}

const initialState: AuthState = {
  //TODO: tokens to be saved in cookie
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{
        isAuthenticated: boolean;
        user: { email: string } | null;
        token: string | null;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export default authSlice.reducer;
