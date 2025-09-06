import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "lawyer",
  isLoggedIn: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAsLawyer: (state) => {
      state.user = "lawyer";
      state.isLoggedIn = true;
    },
    loginAsClient: (state) => {
      state.user = "client";
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginAsLawyer, loginAsClient, logout } = userSlice.actions;
export default userSlice.reducer;
