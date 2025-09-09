import { createSlice } from "@reduxjs/toolkit";

const savedRole =
  typeof window !== "undefined" ? localStorage.getItem("role") : null;
const hasToken =
  typeof window !== "undefined" ? !!localStorage.getItem("token") : false;

const initialState = {
  user: savedRole === "lawyer" ? "lawyer" : "client",
  isLoggedIn: hasToken,
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
      state.user = "client";
      state.isLoggedIn = false;
    },
  },
});

export const { setRoleAsLawyer, setRoleAsClient, setLogin, logout } =
  userSlice.actions;
export default userSlice.reducer;
