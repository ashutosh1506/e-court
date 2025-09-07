import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "client",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRoleAsLawyer: (state) => {
      state.user = "lawyer";
    },
    setRoleAsClient: (state) => {
      state.user = "client";
    },
    setLogin: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setRoleAsLawyer, setRoleAsClient, setLogin, logout } =
  userSlice.actions;
export default userSlice.reducer;
